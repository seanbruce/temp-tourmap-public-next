"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import dayjs from "dayjs";
import clsx from "clsx";

interface ChangeMonthButtonProps {
  title: React.ReactNode;
  lang: string;
  productGroupId: string;
  date: string;
  month: string;
  disabled?: boolean;
}

export default function ChangeMonthButton({
  title,
  lang,
  productGroupId,
  date,
  month,
  disabled,
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
      className={clsx(
        "py-1",
        "px-2",
        "rounded",
        "hover:bg-[#7bb543]",
        "transition-colors",
        "inline-flex",
        "items-center",
        disabled ? "pointer-events-none" : "pointer-events-auto",
        disabled ? "text-gray-400" : "text-white"
      )}
    >
      {title}
    </Link>
  );
}
