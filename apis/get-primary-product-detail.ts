import "server-only";
import client from "./client";
import { RequiredDeep } from "type-fest";
import { paths } from "@/type/api";
import { NEXT_PUBLIC_API_URL } from "@/environments";

export type GetPrimaryProductDetailResponse = RequiredDeep<
  paths["/api/product-service/products/camping-product-detail/{productId}"]["get"]["responses"]["200"]["content"]["application/json"]
>;

export type GetPrimaryProductDetailParams =
  paths["/api/product-service/products/camping-product-detail/{productId}"]["get"]["parameters"];

export const preload = (params: GetPrimaryProductDetailParams) => {
  void getPrimaryProductDetail(params);
};

export const getPrimaryProductDetail = async (
  params: GetPrimaryProductDetailParams
) => {
  const res = await client(
    `${NEXT_PUBLIC_API_URL}/api/product-service/products/camping-product-detail/${params.path.productId}`,
    { next: { revalidate: 60 } }
  );
  const json = await res.json();
  return json as GetPrimaryProductDetailResponse;
};
