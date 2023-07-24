import Image from "next/image";
import { GetPrimaryProductListResponse } from "@/apis/get-primary-product-list";
import SelectDateAndBooking from "./primary-product-item/select-date-and-booking";
import { getCartByUser } from "@/apis/get-cart-by-user";

interface PrimaryProductItemProps {
  item: GetPrimaryProductListResponse[number];
}

export default async function PrimaryProductItem({
  item,
}: PrimaryProductItemProps) {
  const campingImgUrl = item?.campingImages?.[0]?.url;
  const cart = await getCartByUser();
  return (
    <div className="transition-colors border-2 border-brand-gold hover:border-brand-gold-dark bg-[#eeeeee] rounded overflow-hidden flex flex-col">
      <div className="h-44 border-b">
        {campingImgUrl ? (
          <Image
            src={campingImgUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center text-gray-400 font-bold tracking-widest">
            暫無圖片
          </div>
        )}
      </div>
      <div className="px-4 pt-4">
        <p className="text-slate-900 font-bold mb-4 flex flex-nowrap justify-between items-center line-clamp-1">
          {item.camping.displayName}
        </p>
        <p className="text-sm text-slate-700 flex justify-between items-end mb-4">
          <span>加人單價</span>
          <span>
            NTD$
            <span className="text-base text-slate-900 font-bold ml-1">
              {item.camping.addPeoplePrice}
            </span>
          </span>
        </p>
      </div>
      <SelectDateAndBooking
        detail={item.campingProjectDetails}
        cart={cart}
        addPeopleLimit={item.camping.addPeopleLimit ?? 0}
        primaryProductId={item.camping.id}
      />
    </div>
  );
}
