import Link from "next/link";
import dayjs from "dayjs";
import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import MonthView from "./calender/month-view";
import { SEARCH_DATE_PARAM } from "@/utils/constants";

interface CalenderProps {
  lang: string;
  productGroupId: string;
  date: string;
  searchDate: string;
}

export default function Calender({
  lang,
  productGroupId,
  date,
  searchDate,
}: CalenderProps) {
  const thisMonth = dayjs(searchDate).toDate();
  const nextMonth = dayjs(thisMonth).add(1, "month").toDate();

  const getNewUrlBySearchDate = (date: dayjs.Dayjs) => {
    return `/${lang}/booking-online/${productGroupId}/${date}?${SEARCH_DATE_PARAM}=${dayjs(
      date
    )
      .subtract(1, "month")
      .format("YYYY-MM-DD")}`;
  };

  return (
    <div className="h-[418px] mb-5 relative">
      <div className="h-[40px] flex justify-between items-center bg-[#88c84b] text-white px-2">
        <Link
          href={getNewUrlBySearchDate(dayjs(thisMonth).subtract(1, "month"))}
          className="py-1 px-2 rounded hover:bg-[#7bb543] transition-colors inline-flex items-center"
        >
          <FontAwesomeIcon icon={faCaretLeft} className="w-2 h-4" />
          上個月
        </Link>
        <Link
          href={getNewUrlBySearchDate(dayjs())}
          className="py-1 px-2 rounded hover:bg-[#7bb543] transition-colors"
        >
          選擇今日
        </Link>
        <Link
          href={getNewUrlBySearchDate(dayjs(thisMonth).add(1, "month"))}
          className="py-1 px-2 rounded hover:bg-[#7bb543] transition-colors inline-flex items-center"
        >
          下個月
          <FontAwesomeIcon icon={faCaretRight} className="w-2 h-4" />
        </Link>
      </div>
      <div className="relative">
        <div className="flex flex-nowrap gap-7 mb-2">
          <div className="grow">
            <Suspense fallback={<div>加載中</div>}>
              <MonthView
                productGroupId={productGroupId}
                date={date}
                searchDate={thisMonth}
              />
            </Suspense>
          </div>
          <div className="grow max-[980px]:hidden">
            <Suspense fallback={<div>加載中</div>}>
              <MonthView
                productGroupId={productGroupId}
                date={date}
                searchDate={nextMonth}
              />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="bg-black py-2 text-center font-extrabold text-brand-gold border-2 border-brand-gold">
        查詢日期：{dayjs(date).format("YYYY-MM-DD 【dddd】")}
      </div>
    </div>
  );
}