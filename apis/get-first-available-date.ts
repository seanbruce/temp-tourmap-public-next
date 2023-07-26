import "server-only";
import { RequiredDeep } from "type-fest";
import { paths } from "@/type/api";
import { NEXT_PUBLIC_API_URL } from "@/environments";

export type GetFirstAvailableDateResponse = RequiredDeep<
  paths["/api/product-service/product-group/first-can-booking-date/{productGroupId}"]["get"]["responses"]["200"]["content"]["application/json"]
>;

export type GetFirstAvailableDateParams =
  paths["/api/product-service/product-group/first-can-booking-date/{productGroupId}"]["get"]["parameters"];

export const preload = (params: GetFirstAvailableDateParams) => {
  void getFirstAvailableDate(params);
};

export const getFirstAvailableDate = async (
  params: GetFirstAvailableDateParams
) => {
  const res = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/product-service/product-group/first-can-booking-date/${params.path.productGroupId}`,
    { next: { revalidate: 0 } }
  );
  const json = await res.json();
  return json as GetFirstAvailableDateResponse;
};
