import "server-only";
import { RequiredDeep } from "type-fest";
import { paths } from "@/type/api";
import { DEV_MODE, NEXT_PUBLIC_API_URL } from "@/environments";
import tags from "./tags";

export type GetBookingAvailabilityByMonthResponse = RequiredDeep<
  paths["/api/product-service/product-group/booking-month-calendar/{productGroupId}"]["get"]["responses"]["200"]["content"]["application/json"]
>;

export type GetBookingAvailabilityByMonthParams = RequiredDeep<
  paths["/api/product-service/product-group/booking-month-calendar/{productGroupId}"]["get"]["parameters"]
>;

export const preload = (props: GetBookingAvailabilityByMonthParams) => {
  void getBookingAvailabilityByMonth(props);
};

export const getBookingAvailabilityByMonth = async (
  props: GetBookingAvailabilityByMonthParams
) => {
  const res = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/product-service/product-group/booking-month-calendar/${props.path.productGroupId}?month=${props.query.month}`,
    {
      next: { revalidate: DEV_MODE ? 0 : 60, tags: [tags.bookingAvailability] },
    }
  );
  const json = await res.json();
  return json as GetBookingAvailabilityByMonthResponse;
};
