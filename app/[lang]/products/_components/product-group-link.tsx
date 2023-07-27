import Link from "next/link";
import Image from "next/image";
import { GetProductGroupListResponse } from "@/apis/get-product-group-list";
import campingGroupImage from "../_assets/camping.png";
import { getFirstAvailableDate } from "@/apis/get-first-available-date";
import { z } from "zod";
import dayjs from "dayjs";

interface ProductGroupLinkProps {
  lang: string;
  campingAreaId: string;
  productGroup: GetProductGroupListResponse[number];
}

export default async function ProductGroupLink({
  productGroup,
  lang,
  campingAreaId,
}: ProductGroupLinkProps) {
  console.log(productGroup.productGroup.id);
  const available = await getFirstAvailableDate({
    path: { id: productGroup.productGroup.id },
  });

  const defaultDate = z.string().safeParse(available.date).success
    ? dayjs(available.date).format("YYYY-MM-DD")
    : dayjs().format("YYYY-MM-DD");

  const href = `/${lang}/booking-online/${productGroup.productGroup.id}/${defaultDate}/${defaultDate}/${campingAreaId}#company-carousel`;

  return (
    <Link
      key={productGroup.productGroup.id}
      href={href}
      className="flex flex-col items-center"
      scroll={true}
    >
      <div className="relative w-24 h-24 lg:w-36 lg:h-36 block">
        <Image
          src={campingGroupImage}
          alt="campingGroupImage"
          className="absolute object-contain w-full h-full inset-0"
        />
      </div>
      <span className="text-center">{productGroup.productGroup.name}</span>
    </Link>
  );
}

export function Loading() {
  return (
    <div>
      <div className="w-[144px] h-[144px] mb-1 rounded-full bg-skeleton animate-pulse" />
      <div className="w-[100px] h-[20px] bg-skeleton animate-pulse mx-auto" />
    </div>
  );
}
