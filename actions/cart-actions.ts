"use server";

import { getCartByUser } from "@/apis/get-cart-by-user";
import tags from "@/apis/tags";
import { NEXT_PUBLIC_API_URL } from "@/environments";
import { paths } from "@/type/api";
import { revalidateTag } from "next/cache";
import { RequiredDeep } from "type-fest";
import { z } from "zod";

const AddPrimaryProductToCartDataScheme = z.object({
  skuId: z.string(),
  date: z.string(),
});

type UpdateShoppingCartBody = RequiredDeep<
  paths["/api/product-service/shopping-cart-item/shopping-cart"]["put"]
>["requestBody"]["content"]["application/json"];

export async function addPrimaryProductToCart(data: FormData) {
  const cart = await getCartByUser();

  const parsedData = AddPrimaryProductToCartDataScheme.parse({
    skuId: data.get("skuId"),
    date:
      typeof data.get("date") === "string"
        ? decodeURIComponent(data.get("date") as string)
        : null,
  });

  const newCart: UpdateShoppingCartBody = {
    ownerId: cart.ownerId,
    createOrUpdateDetiails: [
      ...(cart.shoppingCartItems?.map((item) => ({
        id: null,
        productId: item.productId,
        quantity: 1,
        date: item.date,
      })) ?? []),
      {
        id: null,
        productId: parsedData.skuId,
        quantity: 1,
        date: parsedData.date,
      },
    ],
  };

  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/product-service/shopping-cart-item/shopping-cart`,
    {
      method: "PUT",
      body: JSON.stringify(newCart),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    revalidateTag(tags.userCart);
  }
}

const RemovePrimaryProductToCartDataScheme = z.object({
  skuId: z.string(),
  date: z.string(),
});

export async function removePrimaryProductToCart(data: FormData) {
  const cart = await getCartByUser();

  const parsedData = RemovePrimaryProductToCartDataScheme.parse({
    skuId: data.get("skuId"),
    date:
      typeof data.get("date") === "string"
        ? decodeURIComponent(data.get("date") as string)
        : null,
  });

  const newCart: UpdateShoppingCartBody = {
    ownerId: cart.ownerId,
    createOrUpdateDetiails: [
      ...(cart.shoppingCartItems
        ?.filter(
          (item) =>
            `${item.productId}${item.date}` !==
            `${parsedData.skuId}${parsedData.date}`
        )
        ?.map((item) => ({
          id: null,
          productId: item.productId,
          quantity: 1,
          date: item.date,
        })) ?? []),
    ],
  };

  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/product-service/shopping-cart-item/shopping-cart`,
    {
      method: "PUT",
      body: JSON.stringify(newCart),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    revalidateTag(tags.userCart);
  }
}
