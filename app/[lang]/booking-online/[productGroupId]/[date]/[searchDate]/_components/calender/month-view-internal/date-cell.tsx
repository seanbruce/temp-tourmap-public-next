"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useSelectedLayoutSegment } from "next/navigation";

interface DateCellProps {
  index: number;
  lang: string;
  productGroupId: string;
  firstDayOfMonth: number;
  searchDate: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const convertIndexToDayJsBaseOnMonth = (
  index: number,
  firstDayOfMonth: number,
  month: Date
) => {
  return dayjs(month)
    .startOf("month")
    .add(index - firstDayOfMonth, "day");
};

export default function DateCell({
  index,
  lang,
  productGroupId,
  firstDayOfMonth,
  searchDate,
  children,
  className,
  style,
}: DateCellProps) {
  const campingAreaId = useSelectedLayoutSegment();
  return (
    <Link
      replace
      scroll={false}
      href={`/${lang}/booking-online/${productGroupId}/${convertIndexToDayJsBaseOnMonth(
        index,
        firstDayOfMonth,
        dayjs(searchDate).toDate()
      ).format("YYYY-MM-DD")}/${dayjs(searchDate).format(
        "YYYY-MM-DD"
      )}/${campingAreaId}`}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}
