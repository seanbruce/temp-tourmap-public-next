import { GetPrimaryProductListResponse } from "@/apis/get-primary-product-list";
import PrimaryProductItem from "./primary-product-list/primary-product-item";
import { getPrimaryProductList } from "@/apis/get-primary-product-list";
import clsx from "clsx";

interface PrimaryProductListProps {
  campingAreaId: string;
  campingName: string;
  date: string;
  productGroupId: string;
}

export default async function PrimaryProductList({
  campingAreaId,
  campingName,
  date,
  productGroupId,
}: PrimaryProductListProps) {
  const primaryProductList = await getPrimaryProductList({
    query: {
      CampingAreaId: campingAreaId,
      CampingName: campingName,
      Date: date,
      ProductGroupId: productGroupId,
    },
  });
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

  return <ListContainer>{primaryProductListUI}</ListContainer>;
}

interface ListContainerProps {
  children: React.ReactNode;
  className?: string;
}

function ListContainer({ children, className }: ListContainerProps) {
  return (
    <div
      className={clsx(
        "px-4 grid grid-cols-2 gap-4 max-sm:grid-cols-1 mb-12",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Loading() {
  return (
    <ListContainer className="animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-[580px] bg-skeleton" />
      ))}
    </ListContainer>
  );
}
