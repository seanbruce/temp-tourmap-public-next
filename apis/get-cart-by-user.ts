import "server-only";
import client from "./client";
import { RequiredDeep } from "type-fest";
import { paths } from "@/type/api";
import { NEXT_PUBLIC_API_URL } from "@/environments";
import { cookies } from "next/headers";
import { userUUIDCookieName } from "@/utils/constants";

import tags from "./tags";

export type GetCartByUserResponse = RequiredDeep<
  paths["/api/product-service/shopping-cart-item/shopping-cart/{ownerId}"]["get"]["responses"]["200"]["content"]["application/json"]
>;

export const preload = () => {
  void getCartByUser();
};

export const getCartByUser = async () => {
  const cookieStore = cookies();
  const userUUID = cookieStore.get(userUUIDCookieName);
  if (!userUUID) throw Error("獲取用戶失敗");
  const res = await client(
    `${NEXT_PUBLIC_API_URL}/api/product-service/shopping-cart-item/shopping-cart/${userUUID.value}`,
    { next: { revalidate: 60, tags: [tags.userCart] } }
  );
  const json = await res.json();
  return json as GetCartByUserResponse;
};
