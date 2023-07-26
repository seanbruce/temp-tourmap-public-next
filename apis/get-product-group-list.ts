import "server-only";
import { RequiredDeep } from "type-fest";
import { paths } from "@/type/api";
import { NEXT_PUBLIC_API_URL } from "@/environments";

export type GetProductGroupListResponse = RequiredDeep<
  paths["/api/product-service/product-group/product-groups"]["get"]["responses"]["200"]["content"]["application/json"]
>;

export const preload = () => {
  void getProductGroupList();
};

export const getProductGroupList = async () => {
  const res = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/product-service/product-group/product-groups`,
    { next: { revalidate: 60 } }
  );
  const json = await res.json();
  return json as GetProductGroupListResponse;
};
