"use client";

import { useState } from "react";
import { clsx } from "clsx";
import Button from "@/components/button";

interface FoodProps {
  id: string;
  url: string;
  name: string;
  description: string;
}

function Food({ id, url, name, description }: FoodProps) {
  const [foodTime, setFoodTime] = useState<
    "breakfast" | "lunch" | "dinner" | null
  >(null);
  return (
    <div
      key={id}
      className="flex flex-nowrap max-sm:flex-col border-2 border-brand-gold-dark"
    >
      <div className="w-1/2 h-1/2 self-center pb-[50%] overflow-hidden relative shrink-0 max-sm:w-full max-sm:pb-[100%]">
        <img
          src={url}
          alt={name}
          className="w-full h-full absolute inset-0 object-fill"
        />
      </div>
      <div className="grow bg-stone-900 p-8 pb-2 flex flex-col">
        <div className="mb-4 flex flex-nowrap max-sm:flex-col items-end max-sm:items-start">
          <p className="font-bold text-2xl text-stone-50 line-clamp-1">
            {name}
          </p>
          <p className="ml-auto ">
            <span className="mr-2 font-bold">免費</span>
            <span className="text-brand-gold line-through">NTD$ 1240</span>
          </p>
        </div>
        <p className="text-stone-100 text-sm mb-2">{description}</p>
        <div className="mt-auto">
          {name === "披薩" ? (
            <p className="border border-dashed border-brand-gold text-brand-gold font-bold h-16 flex justify-center items-center">
              已在購物車中【午餐】
            </p>
          ) : (
            <>
              <div
                className={clsx(
                  "grid grid-cols-3 gap-2",
                  foodTime === null ? "mb-[46px]" : "mb-[10px]"
                )}
              >
                <Button
                  variant={foodTime === "breakfast" ? "flat" : "stroked"}
                  onClick={() => setFoodTime("breakfast")}
                >
                  訂早餐
                </Button>
                <Button
                  variant={foodTime === "lunch" ? "flat" : "stroked"}
                  onClick={() => setFoodTime("lunch")}
                >
                  訂中餐
                </Button>
                <Button
                  variant={foodTime === "dinner" ? "flat" : "stroked"}
                  onClick={() => setFoodTime("dinner")}
                >
                  訂晚餐
                </Button>
              </div>
              {foodTime !== null && (
                <div className="h-[36px]">
                  <Button className="w-full">加入購物車</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { Food };
