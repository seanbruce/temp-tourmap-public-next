import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import dayjs from "dayjs";
import { GetCampingAreaListResponse } from "@/apis/get-camping-area-list";
import campingAreaImage from "@/public/assets/camping-area.png";
import SearchBar from "./camping-area-list/search-bar";

interface CampingAreaListProps {
  lang: string;
  productGroupId: string;
  date: string;
  searchDate: string;
  campingAreaId: string;
  campingAreaList: GetCampingAreaListResponse;
}

export default async function CampingAreaList({
  lang,
  productGroupId,
  date,
  searchDate,
  campingAreaId,
  campingAreaList,
}: CampingAreaListProps) {
  const COMMON_AREA_BUTTON_STYLE =
    "px-4 py-1 hover:bg-brand-gold-dark hover:text-black transition-colors";
  const HIGHLIGHTED_AREA_BUTTON_STYLE = "bg-brand-gold text-black";
  const areas = (
    <div className="flex gap-1 ">
      {campingAreaList.map((campingArea) => (
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
