import { getPrimaryProductList } from "@/apis/get-primary-product-list";

interface BadgeProps {
  campingAreaId: string;
  campingName: string;
  date: string;
  productGroupId: string;
}

export default async function Badge({
  campingAreaId,
  campingName,
  date,
  productGroupId,
}: BadgeProps) {
  const primaryProductList = await getPrimaryProductList({
    query: {
      CampingAreaId: campingAreaId,
      CampingName: campingName,
      Date: date,
      ProductGroupId: productGroupId,
    },
  });

  return (
    primaryProductList.length > 0 && (
      <span className="absolute inline-flex text-xs w-5 h-5 right-0 top-0 bg-red-400 text-white rounded-full -translate-y-1/2 translate-x-1/2 justify-center items-center">
        {primaryProductList.length}
      </span>
    )
  );
}
