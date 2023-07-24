import { GetPrimaryProductListResponse } from "@/apis/get-primary-product-list";
import PrimaryProductItem from "./primary-product-list/primary-product-item";

interface PrimaryProductListProps {
  primaryProductList: GetPrimaryProductListResponse;
}

export default async function PrimaryProductList({
  primaryProductList,
}: PrimaryProductListProps) {
  let primaryProductListUI = null;

  if (primaryProductList.length === 0) {
    primaryProductListUI = (
      <div className="h-24 flex justify-center items-center col-span-full">
        沒有可訂的營位
      </div>
    );
  } else {
    primaryProductListUI = primaryProductList.map((primaryProduct) => (
      <PrimaryProductItem
        key={primaryProduct.camping.id}
        item={primaryProduct}
      />
    ));
  }

  return (
    <div className="px-4 grid grid-cols-2 gap-4 max-sm:grid-cols-1 mb-12">
      {primaryProductListUI}
    </div>
  );
}
