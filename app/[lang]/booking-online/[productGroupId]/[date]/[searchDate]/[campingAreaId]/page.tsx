import { Suspense } from "react";
import CampingAreaList from "./_components/camping-area-list";
import PrimaryProductList from "./_components/primary-product-list";
import { searchParamNames } from "@/utils/constants";
import { getCampingAreaList } from "@/apis/get-camping-area-list";
import { getPrimaryProductList } from "@/apis/get-primary-product-list";
import { getCartByUser } from "@/apis/get-cart-by-user";
import FloatActionButtons, {
  FloatActionButton,
} from "@/components/float-action-buttons";
import QuickCheckButton from "./_components/quick-check-button";
import { quickCheckAction } from "@/actions/quick-check-action";

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
  const CampingName =
    typeof searchParams[searchParamNames.campingName] === "string"
      ? (searchParams[searchParamNames.campingName] as string)
      : "";

  const cartData = getCartByUser();
  const campingAreaListData = getCampingAreaList();
  const primaryProductListData = getPrimaryProductList({
    query: {
      CampingAreaId: campingAreaId,
      CampingName,
      Date: date,
      ProductGroupId: productGroupId,
    },
  });
  const [cart, campingAreaList, primaryProductList] = await Promise.all([
    cartData,
    campingAreaListData,
    primaryProductListData,
  ]);

  const isEmptyCart =
    !cart.shoppingCartItems || cart.shoppingCartItems.length === 0;

  return (
    <>
      <Suspense fallback={null}>
        <CampingAreaList
          lang={lang}
          productGroupId={productGroupId}
          date={date}
          searchDate={searchDate}
          campingAreaId={campingAreaId}
          campingAreaList={campingAreaList}
        />
      </Suspense>
      <PrimaryProductList primaryProductList={primaryProductList} />
      <FloatActionButtons
        lang={lang}
        stepBackwardBtn={null}
        stepForwardBtn={
          <FloatActionButton disabled={isEmptyCart}>
            {isEmptyCart ? (
              "請選擇一個產品"
            ) : (
              <form action={quickCheckAction}>
                <QuickCheckButton />
              </form>
            )}
          </FloatActionButton>
        }
      />
    </>
  );
}
