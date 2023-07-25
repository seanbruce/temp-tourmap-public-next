import { Suspense } from "react";
import CampingAreaList from "./_components/camping-area-list";
import PrimaryProductList from "./_components/primary-product-list";
import { searchParamNames } from "@/utils/constants";
import {
  getCampingAreaList,
  preload as preloadCampingAreaList,
} from "@/apis/get-camping-area-list";
import {
  getPrimaryProductList,
  preload as preloadPrimaryProductList,
} from "@/apis/get-primary-product-list";
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
      <Suspense fallback={null}>
        <CampingAreaList
          lang={lang}
          campingName={campingName}
          productGroupId={productGroupId}
          date={date}
          searchDate={searchDate}
          campingAreaId={campingAreaId}
        />
      </Suspense>
      <PrimaryProductList
        campingAreaId={campingAreaId}
        campingName={campingName}
        date={date}
        productGroupId={productGroupId}
      />
      <Suspense fallback={null}>
        <FloatActionButtons
          lang={lang}
          stepBackwardBtn={null}
          stepForwardBtn={
            isEmptyCart ? (
              <FloatActionButton disabled={isEmptyCart}>
                請選擇一個產品
              </FloatActionButton>
            ) : (
              <form action={quickCheckAction}>
                <QuickCheckButton />
              </form>
            )
          }
        />
      </Suspense>
    </>
  );
}
