import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import dayjs from "dayjs";
import campingAreaImage from "@/public/assets/camping-area.png";
import SearchBar from "./camping-area-list/search-bar";
import { getCampingAreaList } from "@/apis/get-camping-area-list";
import { preload as preloadPrimaryProductList } from "@/apis/get-primary-product-list";
import Badge from "./camping-area-list/badge";

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

  campingAreaList.forEach((area) => {
    preloadPrimaryProductList({
      query: {
        CampingAreaId: area.id,
        CampingName: campingName,
        Date: date,
        ProductGroupId: productGroupId,
      },
    });
  });

  const COMMON_AREA_BUTTON_STYLE =
    "px-4 py-1 hover:bg-brand-gold-dark hover:text-black transition-colors relative";
  const HIGHLIGHTED_AREA_BUTTON_STYLE = "bg-brand-gold text-black";
  const areas = (
    <div className="flex gap-2">
      {campingAreaList.map((campingArea) => (
        <Link
          key={campingArea.id}
          href={`/${lang}/booking-online/${productGroupId}/${date}/${dayjs(
            searchDate
          ).format("YYYY-MM-DD")}/${campingArea.id}`}
          scroll={false}
          className={clsx(
            COMMON_AREA_BUTTON_STYLE,
            campingAreaId === campingArea.id
              ? HIGHLIGHTED_AREA_BUTTON_STYLE
              : ""
          )}
        >
          {campingArea.displayName}
          <Suspense fallback={null}>
            <Badge
              campingAreaId={campingArea.id}
              campingName={campingName}
              date={date}
              productGroupId={productGroupId}
            />
          </Suspense>
        </Link>
      ))}
    </div>
  );
  return (
    <ListContainer
      areas={areas}
      searchBar={<SearchBar />}
      carousel={
        <Image
          src={campingAreaImage}
          alt="campingAreaImage"
          fill
          className="object-cover"
        />
      }
    />
  );
}

function ListContainer({
  areas,
  searchBar,
  carousel,
}: {
  areas: React.ReactNode;
  searchBar: React.ReactNode;
  carousel: React.ReactNode;
}) {
  return (
    <>
      <div className="px-4 mb-4 flex flex-nowrap max-sm:flex-col">
        {areas}
        <Suspense fallback={null}>{searchBar}</Suspense>
      </div>
      <div className="relative aspect-[4/3] mx-4 mb-4">{carousel}</div>
    </>
  );
}

export function Loading() {
  return (
    <ListContainer
      areas={
        <div className="flex gap-2 animate-pulse ">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-[58px] h-[32px] bg-skeleton" />
          ))}
        </div>
      }
      searchBar={<SearchBar />}
      carousel={<div className="w-full h-full bg-skeleton animate-pulse" />}
    />
  );
}
