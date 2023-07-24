"use client";

import { useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { GetPrimaryProductListResponse } from "@/apis/get-primary-product-list";
import { GetCartByUserResponse } from "@/apis/get-cart-by-user";
import PrimaryProductSKU from "./select-date-and-booking/primary-product-sku";

interface SelectDateAndBookingProps {
  addPeopleLimit: number;
  primaryProductId: string;
  cart: GetCartByUserResponse;
  detail: GetPrimaryProductListResponse[number]["campingProjectDetails"];
}

export default function SelectDateAndBooking({
  addPeopleLimit,
  primaryProductId,
  cart,
  detail,
}: SelectDateAndBookingProps) {
  const dates = Object.keys(detail ?? {});
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    if (dates[0]) {
      return dates[0];
    }
    return "";
  });

  const skuDetail = (detail ?? {})[selectedDate];
  return (
    <>
      <p className="px-4 flex flex-wrap gap-2 mb-2">
        {dates.map((date) => (
          <button
            key={date}
            type="button"
            className={clsx(
              "text-slate-900 text-sm px-2 py-0.5 rounded whitespace-nowrap",
              selectedDate === date && "bg-brand-gold"
            )}
            onClick={() => setSelectedDate(date)}
          >
            {dayjs(date).format("YYYY-MM-DD")}
          </button>
        ))}
      </p>

      {skuDetail ? (
        <form>
          <PrimaryProductSKU
            cart={cart}
            selectedDate={selectedDate}
            addPeopleLimit={addPeopleLimit}
            skuDetail={skuDetail}
            primaryProductId={primaryProductId}
          />
        </form>
      ) : (
        // the height of placeholder need further tweak when we have the real data
        <div className="h-[312px]" />
      )}
    </>
  );
}
