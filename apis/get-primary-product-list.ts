import "server-only";
import { RequiredDeep } from "type-fest";
import { paths } from "@/type/api";
import { NEXT_PUBLIC_API_URL } from "@/environments";

export type GetPrimaryProductListResponse = RequiredDeep<
  paths["/api/product-service/products/camping-product-list"]["get"]["responses"]["200"]["content"]["application/json"]
>;

export type GetPrimaryProductListParams = RequiredDeep<
  paths["/api/product-service/products/camping-product-list"]["get"]["parameters"]
>;

export const preload = (params: GetPrimaryProductListParams) => {
  void getPrimaryProductList(params);
};

export const getPrimaryProductList = async (
  params: GetPrimaryProductListParams
) => {
  let url = `/api/product-service/products/camping-product-list?`;
  if (params.query.ProductGroupId) {
    url += `ProductGroupId=${params.query.ProductGroupId}`;
  }
  if (params.query.Date) {
    url += `&Date=${params.query.Date}`;
  }
  if (params.query.CampingAreaId) {
    url += `&CampingAreaId=${params.query.CampingAreaId}`;
  }
  if (params.query.CampingName) {
    url += `&CampingName=${params.query.CampingName}`;
  }
  const res = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, {
    next: { revalidate: 60 },
  });
  const json = await res.json();
  return json as GetPrimaryProductListResponse;
};
