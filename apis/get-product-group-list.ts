import "server-only";
import { RequiredDeep } from "type-fest";
import { paths } from "@/type/api";
import { DEV_MODE, NEXT_PUBLIC_API_URL } from "@/environments";

export type ProductGroupListResponse = RequiredDeep<
  paths["/api/product-service/product-group/product-groups"]["get"]["responses"]["200"]["content"]["application/json"]
>;

export const preload = () => {
  void getProductGroupList();
};

export const getProductGroupList = async () => {
  const res = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/product-service/product-group/product-groups`,
    { next: { revalidate: DEV_MODE ? 0 : 60 } }
  );
  const json = await res.json();
  return json as ProductGroupListResponse;
};
