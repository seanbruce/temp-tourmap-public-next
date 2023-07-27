import "server-only";
import { RequiredDeep } from "type-fest";
import { paths } from "@/type/api";
import { NEXT_PUBLIC_API_URL } from "@/environments";
import client from "./client";

export type GetCampingAreaListResponse = RequiredDeep<
  paths["/api/product-service/products/camping-areas"]["get"]["responses"]["200"]["content"]["application/json"]
>;

export const preload = () => {
  void getCampingAreaList();
};

export const getCampingAreaList = async () => {
  const res = await client(
    `${NEXT_PUBLIC_API_URL}/api/product-service/products/camping-areas`,
    { next: { revalidate: 60 } }
  );
  const json = await res.json();
  return json as GetCampingAreaListResponse;
};
