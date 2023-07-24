import Link from "next/link";
import dayjs from "dayjs";
import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import MonthView, { Loading } from "./calender/month-view";
import ChangeMonthButton from "./calender/change-month-button";

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

  return (
    <div className="h-[418px] mb-5 relative">
      <div className="h-[40px] flex justify-between items-center bg-[#88c84b] text-white px-2">
        <ChangeMonthButton
          title={
            <>
              <FontAwesomeIcon icon={faCaretLeft} className="w-2 h-4" />
              上個月
            </>
          }
          lang={lang}
          productGroupId={productGroupId}
          date={date}
          month={dayjs(thisMonth).subtract(1, "month").format("YYYY-MM-DD")}
        />
        <ChangeMonthButton
          title="本月"
          lang={lang}
          productGroupId={productGroupId}
          date={date}
          month={dayjs().format("YYYY-MM-DD")}
        />
        <ChangeMonthButton
          title={
            <>
              下個月
              <FontAwesomeIcon icon={faCaretRight} className="w-2 h-4" />
            </>
          }
          lang={lang}
          productGroupId={productGroupId}
          date={date}
          month={dayjs(thisMonth).add(1, "month").format("YYYY-MM-DD")}
        />
      </div>
      <div className="relative">
        <div className="flex flex-nowrap gap-7 mb-2">
          <div className="grow">
            <Suspense fallback={<Loading date={date} searchDate={thisMonth} />}>
              <MonthView
                lang={lang}
                productGroupId={productGroupId}
                date={date}
                searchDate={thisMonth}
              />
            </Suspense>
          </div>
          <div className="grow max-[980px]:hidden">
            <Suspense fallback={<Loading date={date} searchDate={nextMonth} />}>
              <MonthView
                lang={lang}
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
