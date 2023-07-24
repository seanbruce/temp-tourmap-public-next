"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import dayjs from "dayjs";

interface ChangeMonthButtonProps {
  title: React.ReactNode;
  lang: string;
  productGroupId: string;
  date: string;
  month: string;
}

export default function ChangeMonthButton({
  title,
  lang,
  productGroupId,
  date,
  month,
}: ChangeMonthButtonProps) {
  const campingAreaId = useSelectedLayoutSegment();

  const getNewUrlBySearchDate = (searchDate: string) => {
    return `/${lang}/booking-online/${productGroupId}/${date}/${dayjs(
      searchDate
    ).format("YYYY-MM-DD")}/${campingAreaId}`;
  };

  return (
    <Link
      href={getNewUrlBySearchDate(month)}
      replace
      scroll={false}
      className="py-1 px-2 rounded hover:bg-[#7bb543] transition-colors inline-flex items-center"
    >
      {title}
    </Link>
  );
}
