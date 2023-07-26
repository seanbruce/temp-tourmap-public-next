"use client";

import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import { clsx } from "clsx";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ContentPlaceholder,
  AdditionServiceList,
} from "./primary-product-item/index";
import cart from "../fake-cart.json";

interface PrimaryProductItemProps {
  lang: string;
  productGroupId: string;
  date: string;
  searchDate: string;
  campingAreaId: string;
  primaryProductSkuId: string;
  primaryProductName: string;
  productDate: string;
  people: number;
  price: number;
}

export default function ProductAndServiceItem({
  lang,
  productGroupId,
  date,
  searchDate,
  campingAreaId,
  primaryProductSkuId,
  primaryProductName,
  productDate,
  people,
  price,
}: PrimaryProductItemProps) {
  const additionServices =
    cart?.shoppingCartItems.find(
      (primaryProduct) =>
        primaryProduct.primaryProductSkuId === primaryProductSkuId &&
        primaryProduct.date === date
    )?.additionItems ?? [];
  const [showAdditionDetail, setShowAdditionDetail] = useState(false);

  return (
    <div
      className={clsx(
        "cursor-pointer",
        "border-2",
        "border-brand-gold",
        "bg-[#eeeeee]",
        "hover:bg-[#f5f5f5]",
        "transition-colors",
        "rounded",
        "overflow-hidden",
        "flex",
        "flex-col",
        "p-4"
      )}
    >
      <p
        className="text-slate-900 font-bold flex flex-nowrap"
        onClick={() => setShowAdditionDetail((prev) => !prev)}
      >
        <span className="line-clamp-2">
          【{dayjs(date).format("YYYY-MM-DD")}】{primaryProductName}
        </span>

        <FontAwesomeIcon
          icon={showAdditionDetail ? faCaretUp : faCaretDown}
          className="ml-auto px-2 py-1 w-[10px] h-[16px]"
        />
      </p>
      <p className="text-sm text-slate-700 flex justify-between items-end">
        <span>加人數量</span>
        <span>
          <span className="text-base text-slate-900 ml-1">{people}</span>人
        </span>
      </p>
      <p className="text-sm text-slate-700 flex justify-between items-end">
        <span>附加服務</span>
        <span>
          已選
          <span className="text-base text-slate-900 mx-1">
            {additionServices.length}
          </span>
          個
        </span>
      </p>
      <p className="text-sm text-slate-700 flex justify-between items-end">
        <span>營區價格</span>
        <span>
          NT$
          <span className="text-base text-brand-gold-darkest ml-1">
            {price}
          </span>
        </span>
      </p>
      <p className="text-sm text-slate-700 flex justify-between items-end">
        <span>附加服務價格</span>
        <span>
          NT$
          <span className="text-base text-brand-gold-darkest ml-1">
            {additionServices.reduce((acc, cur) => acc + cur.totalPrice, 0)}
          </span>
        </span>
      </p>
      <Link
        href={`/${lang}/additional-service/${productGroupId}/${date}/${searchDate}/${campingAreaId}/${primaryProductSkuId}/${productDate}/food`}
        className={clsx(
          "text-sm",
          "font-bold",
          "text-brand-gold-darkest",
          "flex",
          "justify-between",
          "items-end",
          "py-1",
          "self-start"
        )}
      >
        您還沒有點餐，點擊這里快速點餐*
      </Link>
      <Link
        href={`/${lang}/additional-service/${productGroupId}/${date}/${searchDate}/${campingAreaId}/${primaryProductSkuId}/${productDate}/free`}
        className={clsx(
          "text-sm",
          "font-bold",
          "text-brand-gold-darkest",
          "flex",
          "justify-between",
          "items-end",
          "py-1",
          "self-start"
        )}
      >
        點擊這里查看免費贈品*
      </Link>
      <ContentPlaceholder isOpened={showAdditionDetail}>
        <AdditionServiceList
          additionServices={additionServices}
          primaryProductId={primaryProductSkuId}
          date={date}
        />
      </ContentPlaceholder>
    </div>
  );
}
