import Link from "next/link";
import { useState, useMemo } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { GetPrimaryProductListResponse } from "@/apis/get-primary-product-list";
import { GetCartByUserResponse } from "@/apis/get-cart-by-user";
import Select, { Option } from "@/components/select";
import Button from "@/components/button";
import { useParams } from "next/navigation";
import {
  addPrimaryProductToCart,
  removePrimaryProductToCart,
} from "@/actions/cart-actions";

interface PrimaryProductSKUProps {
  cart: GetCartByUserResponse;
  selectedDate: string;
  addPeopleLimit: number;
  skuDetail: Exclude<
    GetPrimaryProductListResponse[number]["campingProjectDetails"],
    null
  >[string];
  primaryProductId: string;
}

type OPERATION_TYPE = "add" | "remove" | "update" | null;

const getAddPeopleOptionTitle = (peopleNumber: number) => {
  if (peopleNumber < 0) {
    return "數據異常";
  }
  if (peopleNumber === 0) {
    return "不加人";
  }
  return `加${peopleNumber}人`;
};

export default function PrimaryProductSKU({
  cart,
  skuDetail,
  addPeopleLimit,
  selectedDate,
}: PrimaryProductSKUProps) {
  const { pending } = useFormStatus();
  const { lang } = useParams();

  const [selectedSKUId, setSelectedSKUId] = useState(() => {
    if (
      skuDetail &&
      skuDetail.availbleProjects &&
      skuDetail.availbleProjects[0]
    ) {
      return skuDetail.availbleProjects[0].product.id;
    }
    return "";
  });
  const description =
    skuDetail?.availbleProjects?.find(
      ({ product }) => product.id === selectedSKUId
    )?.product.description ?? "";

  const skuIdInCart = useMemo(() => {
    if (!cart) {
      return null;
    }

    if (!skuDetail) {
      return null;
    }
    const allCartPrimaryProduct =
      cart.shoppingCartItems?.map((item) => `${item.productId}${item.date}`) ??
      [];
    return skuDetail.availbleProjects?.find((item) =>
      allCartPrimaryProduct.includes(`${item.product.id}${selectedDate}`)
    )?.product.id;
  }, [cart, selectedDate, skuDetail]);

  // const selectedProductSKUId = isProductSelected?.productSKUId ?? null;
  // const selectedProductPeople = isProductSelected?.people ?? null;
  const [selectedPeople, setSelectedPeople] = useState(0);

  const handleUpdatePrimaryProductPeopleNumberInCart = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // if (updateCartStatus === 'loading') return;
    // if (cart === undefined) return;
    // setOperationType('update');
  };

  let skuSelector = null;
  if (!skuIdInCart) {
    skuSelector = (
      <Select
        className="w-full"
        value={selectedSKUId}
        onChange={(event) => setSelectedSKUId(event.target.value)}

        // disabled={updateCartStatus === 'loading' && operationType === 'add'}
      >
        <Option disabled value="">
          請選擇產品類型
        </Option>
        {skuDetail.availbleProjects?.map((option) => (
          <Option key={option.product.id} value={option.product.id}>
            {option.product.displayName}
          </Option>
        ))}
      </Select>
    );
  } else {
    skuSelector = (
      <div className="text-slate-900 flex justify-between items-end py-1 ">
        <span className="text-sm">已選產品類型</span>
        <span className="font-bold">
          {
            skuDetail.availbleProjects?.find(
              (option) => option.product.id === skuIdInCart
            )?.product.displayName
          }
        </span>
      </div>
    );
  }

  let addButton = null;
  if (!skuIdInCart) {
    addButton = (
      <Button
        type="submit"
        className="w-full mt-auto"
        formAction={addPrimaryProductToCart}
        disabled={pending || !selectedSKUId}
      >
        {pending ? "加入中..." : "加入購物車"}
      </Button>
    );
  }

  let deleteButton = null;
  if (skuIdInCart) {
    deleteButton = (
      <Button
        type="submit"
        className="w-full mt-auto"
        color="gray"
        formAction={removePrimaryProductToCart}
        disabled={pending}
      >
        {pending ? "移除中..." : "從購物車移除"}
      </Button>
    );
  }

  const peopleSelect = (
    <Select
      className="w-full"
      value={selectedPeople}
      onChange={(event) => setSelectedPeople(Number(event.target.value))}
      // disabled={updateCartStatus === 'loading'}
    >
      {Array.from({
        length: addPeopleLimit + 1,
      }).map((_, index) => (
        <Option key={index} value={index}>
          {getAddPeopleOptionTitle(index)}
        </Option>
      ))}
    </Select>
  );

  const freeAdditionServices = selectedSKUId ? (
    <div>
      <div
        className="text-slate-700 text-sm flex flex-nowrap items-center line-clamp-2"
        title={description}
      >
        {description}
      </div>
      <div className="flex my-1">
        <Link
          href={`/${lang}/primary-product-detail/${selectedSKUId}/${selectedDate}`}
          prefetch={false}
          className="text-sm text-slate-900 ml-auto hover:underline"
        >
          詳情
        </Link>
      </div>
      <ul className="text-slate-900 text-sm font-bold pl-4 list-disc py-2">
        <li>柿餅兩個</li>
        <li>湯屋兩次</li>
        <li>運動飲料一箱子</li>
        <li>免費接送</li>
      </ul>
    </div>
  ) : null;

  return (
    <>
      <input type="hidden" name="skuId" value={selectedSKUId} readOnly />
      <input type="hidden" name="date" value={selectedDate} readOnly />
      <input type="hidden" name="people" value={selectedPeople} readOnly />
      <div className="p-4 flex flex-col gap-2">
        {skuSelector}
        {freeAdditionServices}
        {peopleSelect}
      </div>
      {addButton}
      {deleteButton}
    </>
  );
}
