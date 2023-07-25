import "server-only";
import "server-only";
import { RequiredDeep } from "type-fest";
import { paths } from "@/type/api";
import { DEV_MODE, NEXT_PUBLIC_API_URL } from "@/environments";
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
  const res = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/product-service/shopping-cart-item/shopping-cart/${userUUID.value}`,
    { next: { revalidate: 0, tags: [tags.userCart] } }
  );
  const json = await res.json();
  return json as GetCartByUserResponse;
};
