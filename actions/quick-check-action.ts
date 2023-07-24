"use server";

import { getCartByUser } from "@/apis/get-cart-by-user";
import { NEXT_PUBLIC_API_URL } from "@/environments";
import { revalidateTag } from "next/cache";

export async function quickCheckAction() {
  const cart = await getCartByUser();
  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/product-service/products/occupy-camping-product-by-cart-id/${cart.ownerId}`,
    {
      method: "POST",
    }
  );

  if (response.ok) {
    revalidateTag("userCart");
  }
}
