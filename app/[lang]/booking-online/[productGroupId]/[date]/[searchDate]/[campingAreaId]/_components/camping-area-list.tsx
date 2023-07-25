import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import dayjs from "dayjs";
import campingAreaImage from "@/public/assets/camping-area.png";
import SearchBar from "./camping-area-list/search-bar";
import { getCampingAreaList } from "@/apis/get-camping-area-list";
import { getPrimaryProductList } from "@/apis/get-primary-product-list";

interface CampingAreaListProps {
  lang: string;
  productGroupId: string;
  campingName: string;
  date: string;
  searchDate: string;
  campingAreaId: string;
}

export default async function CampingAreaList({
  lang,
  productGroupId,
  date,
  searchDate,
  campingAreaId,
  campingName,
}: CampingAreaListProps) {
  const campingAreaList = await getCampingAreaList();

  const primaryProductLists = await Promise.all(
    campingAreaList.map((area) =>
      getPrimaryProductList({
        query: {
          CampingAreaId: area.id,
          CampingName: campingName,
          Date: date,
          ProductGroupId: productGroupId,
        },
      })
    )
  );

  const COMMON_AREA_BUTTON_STYLE =
    "px-4 py-1 hover:bg-brand-gold-dark hover:text-black transition-colors relative";
  const HIGHLIGHTED_AREA_BUTTON_STYLE = "bg-brand-gold text-black";
  const areas = (
    <div className="flex gap-2">
      {campingAreaList.map((campingArea, index) => (
        <Link
          key={campingArea.id}
          href={`/${lang}/booking-online/${productGroupId}/${date}/${dayjs(
            searchDate
          ).format("YYYY-MM-DD")}/${campingArea.id}`}
          className={clsx(
            COMMON_AREA_BUTTON_STYLE,
            campingAreaId === campingArea.id
              ? HIGHLIGHTED_AREA_BUTTON_STYLE
              : ""
          )}
        >
          {campingArea.displayName}
          {primaryProductLists[index].length > 0 && (
            <span className="absolute inline-flex text-xs w-5 h-5 right-0 top-0 bg-red-400 text-white rounded-full -translate-y-1/2 translate-x-1/2 justify-center items-center">
              {primaryProductLists[index].length}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
  return (
    <>
      <div className="px-4 mb-4 flex flex-nowrap max-sm:flex-col">
        {areas}
        <SearchBar />
      </div>
      <div className="relative aspect-[4/3] mx-4 mb-4">
        <Image
          src={campingAreaImage}
          alt="campingAreaImage"
          fill
          className="object-cover"
        />
      </div>
    </>
  );
}
