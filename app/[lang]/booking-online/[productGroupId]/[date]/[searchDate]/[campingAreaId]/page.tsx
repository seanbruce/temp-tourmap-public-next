import { Suspense } from "react";
import Link from "next/link";
import CampingAreaList, {
  Loading as CampingAreaListLoading,
} from "./_components/camping-area-list";
import PrimaryProductList, {
  Loading as PrimaryProductListLoading,
} from "./_components/primary-product-list";
import { searchParamNames } from "@/utils/constants";
import { preload as preloadCampingAreaList } from "@/apis/get-camping-area-list";
import { preload as preloadPrimaryProductList } from "@/apis/get-primary-product-list";
import { getCartByUser } from "@/apis/get-cart-by-user";
import FloatActionButtons, {
  FloatActionButton,
} from "@/components/float-action-buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

interface PageProps {
  params: {
    lang: string;
    productGroupId: string;
    date: string;
    searchDate: string;
    campingAreaId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({
  params: { lang, productGroupId, date, searchDate, campingAreaId },
  searchParams,
}: PageProps) {
  const campingName =
    typeof searchParams[searchParamNames.campingName] === "string"
      ? (searchParams[searchParamNames.campingName] as string)
      : "";

  preloadCampingAreaList();
  preloadPrimaryProductList({
    query: {
      CampingAreaId: campingAreaId,
      CampingName: campingName,
      Date: date,
      ProductGroupId: productGroupId,
    },
  });
  const cartData = getCartByUser();
  const [cart] = await Promise.all([cartData]);

  const isEmptyCart =
    !cart.shoppingCartItems || cart.shoppingCartItems.length === 0;

  return (
    <>
      <Suspense fallback={<CampingAreaListLoading />}>
        <CampingAreaList
          lang={lang}
          campingName={campingName}
          productGroupId={productGroupId}
          date={date}
          searchDate={searchDate}
          campingAreaId={campingAreaId}
        />
      </Suspense>
      <Suspense fallback={<PrimaryProductListLoading />}>
        <PrimaryProductList
          campingAreaId={campingAreaId}
          campingName={campingName}
          date={date}
          productGroupId={productGroupId}
        />
      </Suspense>
      <FloatActionButtons
        lang={lang}
        stepBackwardBtn={null}
        stepForwardBtn={
          isEmptyCart ? (
            <FloatActionButton disabled={isEmptyCart}>
              請選擇一個產品
            </FloatActionButton>
          ) : (
            <FloatActionButton>
              <Link
                href={`/${lang}/additional-service/${productGroupId}/${date}/${searchDate}/${campingAreaId}`}
                className="w-full h-full inline-flex justify-center items-center"
              >
                <span className="inline-flex leading-none">
                  <span className="hidden laptop:inline mr-2">STEP:3</span>
                  <span className="mr-2 translate-y-[0.5px]">選擇服務</span>
                  <FontAwesomeIcon icon={faCaretRight} className="w-2 h-4" />
                </span>
              </Link>
            </FloatActionButton>
          )
        }
      />
    </>
  );
}
