import "server-only";
import client from "./client";
import { RequiredDeep } from "type-fest";
import { paths } from "@/type/api";
import { NEXT_PUBLIC_API_URL } from "@/environments";

export type GetFirstAvailableDateResponse = RequiredDeep<
  paths["/api/product-service/product-group/{id}/first-can-booking-date"]["get"]["responses"]["200"]["content"]["application/json"]
>;

export type GetFirstAvailableDateParams =
  paths["/api/product-service/product-group/{id}/first-can-booking-date"]["get"]["parameters"];

export const preload = (params: GetFirstAvailableDateParams) => {
  void getFirstAvailableDate(params);
};

export const getFirstAvailableDate = async (
  params: GetFirstAvailableDateParams
) => {
  const res = await client(
    `${NEXT_PUBLIC_API_URL}/api/product-service/product-group/${params.path.id}/first-can-booking-date`,
    { next: { revalidate: 0 } }
  );

  const json = await res.json();
  return json as GetFirstAvailableDateResponse;
};
