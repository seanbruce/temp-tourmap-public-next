import { clsx } from "clsx";
import dayjs from "dayjs";
import {
  getBookingAvailabilityByMonth,
  GetBookingAvailabilityByMonthResponse,
} from "@/apis/get-booking-availability-by-month";
import Link from "next/link";
import DateCell from "./month-view-internal/date-cell";

const WEEKS = ["日", "一", "二", "三", "四", "五", "六"];

const getDayBgColor = (index: number) => {
  if (index % 7 === 0 || index % 7 === 6) {
    return "#bfbfbf";
  }
  return "#eeeeee";
};

const isValidDate = (
  index: number,
  firstDayOfMonth: number,
  daysInMonth: number
) => {
  return index >= firstDayOfMonth && index - firstDayOfMonth < daysInMonth;
};

const convertIndexToDayJsBaseOnMonth = (
  index: number,
  firstDayOfMonth: number,
  month: Date
) => {
  return dayjs(month)
    .startOf("month")
    .add(index - firstDayOfMonth, "day");
};

const getAvailabilityByIndex = (
  index: number,
  firstDayOfMonth: number,
  daysInMonth: number,
  month: Date,
  daysAvailability?: GetBookingAvailabilityByMonthResponse
) => {
  if (!isValidDate(index, firstDayOfMonth, daysInMonth)) {
    return false;
  }
  if (daysAvailability === undefined) {
    return undefined;
  }
  const day = convertIndexToDayJsBaseOnMonth(
    index,
    firstDayOfMonth,
    month
  ).date();
  return daysAvailability?.bookingableDays?.[day]?.canBooking === true;
};

const isSelected = (
  index: number,
  firstDayOfMonth: number,
  daysInMonth: number,
  compareDate: Date | null,
  month: Date
) => {
  if (isValidDate(index, firstDayOfMonth, daysInMonth)) {
    return convertIndexToDayJsBaseOnMonth(index, firstDayOfMonth, month).isSame(
      compareDate,
      "date"
    );
  }
  return false;
};

const getAvailabilityStyle = (available?: boolean) => {
  let indicatorColor = "";
  let clickable = "";
  if (available === undefined) {
    indicatorColor = "bg-gray-500";
    clickable = "pointer-events-none";
  } else {
    if (available) {
      indicatorColor = "bg-lime-500";
      clickable = "pointer-events-auto";
    } else {
      indicatorColor = "bg-red-500";
      clickable = "pointer-events-none";
    }
  }
  return {
    indicatorColor,
    clickable,
  };
};
interface MonthViewInternalProps {
  currentSearchDate: string;
  lang: string;
  productGroupId: string;
  thisYear: number;
  thisMonth: number;
  firstDayOfMonth: number;
  daysInMonth: number;
  date: string;
  searchDate: Date;
  availability: GetBookingAvailabilityByMonthResponse | undefined;
}

function MonthViewInternal({
  currentSearchDate,
  lang,
  productGroupId,
  thisYear,
  thisMonth,
  firstDayOfMonth,
  daysInMonth,
  searchDate,
  availability,
  date,
}: MonthViewInternalProps) {
  return (
    <div>
      <div className="h-[40px] flex justify-center items-center bg-black text-white text-[15px] select-none">
        {thisYear} 年 {thisMonth} 月
      </div>
      <div className="h-[40px] flex items-stretch">
        {WEEKS.map((week) => (
          <div
            key={week}
            className="grow text-center bg-[#313131] text-white leading-[40px] select-none"
          >
            {week}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-white relative">
        {Array.from({ length: 42 }).map((_, index) => {
          const available = getAvailabilityByIndex(
            index,
            firstDayOfMonth,
            daysInMonth,
            searchDate,
            availability
          );
          const { clickable, indicatorColor } = getAvailabilityStyle(available);
          const commonProps = {
            className: clsx(
              "text-black",
              "h-[40px]",
              "hover:!bg-[#f9e905]",
              "transition-colors",
              "flex",
              "flex-col",
              "justify-center",
              "items-center",
              "cursor-pointer",
              clickable,
              isSelected(
                index,
                firstDayOfMonth,
                daysInMonth,
                dayjs(date).toDate(),
                searchDate
              ) && "!bg-[#f9e905]"
            ),
            style: { backgroundColor: getDayBgColor(index) },
          };
          const content = isValidDate(index, firstDayOfMonth, daysInMonth) && (
            <>
              <div
                className={clsx(
                  "w-[8px] h-[8px] rounded-full mb-1",
                  indicatorColor
                )}
              ></div>
              <span className="font-bold text-[17px] leading-[17px]">
                {index - firstDayOfMonth + 1}
              </span>
            </>
          );
          if (available) {
            return (
              <DateCell
                currentSearchDate={currentSearchDate}
                key={index}
                index={index}
                lang={lang}
                productGroupId={productGroupId}
                firstDayOfMonth={firstDayOfMonth}
                searchDate={dayjs(searchDate).format("YYYY-MM-DD")}
                {...commonProps}
              >
                {content}
              </DateCell>
            );
          }
          return (
            <div key={index} {...commonProps}>
              {content}
            </div>
          );
        })}
        {!availability && (
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none bg-black/75 flex justify-center items-center">
            <span>讀取中</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface MonthViewProps {
  lang: string;
  productGroupId: string;
  date: string;
  searchDate: Date;
  currentSearchDate: string;
}

export default async function MonthView({
  currentSearchDate,
  lang,
  productGroupId,
  date,
  searchDate,
}: MonthViewProps) {
  const availability = await getBookingAvailabilityByMonth({
    path: { productGroupId },
    query: { month: dayjs(searchDate).format("YYYY-MM-DD") },
  });

  const thisYear = dayjs(searchDate).year();
  const thisMonth = dayjs(searchDate).month() + 1;
  const firstDayOfMonth = dayjs(searchDate).startOf("month").day();
  const daysInMonth = dayjs(searchDate).daysInMonth();

  return (
    <MonthViewInternal
      currentSearchDate={currentSearchDate}
      lang={lang}
      productGroupId={productGroupId}
      thisYear={thisYear}
      thisMonth={thisMonth}
      firstDayOfMonth={firstDayOfMonth}
      daysInMonth={daysInMonth}
      date={date}
      searchDate={searchDate}
      availability={availability}
    />
  );
}

type LoadingProps = Omit<
  MonthViewProps,
  "productGroupId" | "lang" | "campingAreaId" | "currentSearchDate"
>;

export async function Loading({ date, searchDate }: LoadingProps) {
  const thisYear = dayjs(searchDate).year();
  const thisMonth = dayjs(searchDate).month() + 1;
  const firstDayOfMonth = dayjs(searchDate).startOf("month").day();
  const daysInMonth = dayjs(searchDate).daysInMonth();

  return (
    <MonthViewInternal
      currentSearchDate="#"
      lang="#"
      productGroupId="#"
      thisYear={thisYear}
      thisMonth={thisMonth}
      firstDayOfMonth={firstDayOfMonth}
      daysInMonth={daysInMonth}
      date={date}
      searchDate={searchDate}
      availability={undefined}
    />
  );
}
