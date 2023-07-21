import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import CompanyCarousel from "@/components/company-carousel";
import PageContainer from "@/components/page-container";
import { getProductGroupList } from "@/apis/get-product-group-list";
import campingGroupImage from "./_assets/camping.png";
import { SEARCH_DATE_PARAM } from "@/utils/constants";

interface BookingOnlinePageProps {
  params: { lang: string };
}

export default async function BookingOnlinePage({
  params: { lang },
}: BookingOnlinePageProps) {
  const productGroupList = await getProductGroupList();
  const formattedToday = dayjs().format("YYYY-MM-DD");
  return (
    <>
      <CompanyCarousel />
      <PageContainer>
        <div className="flex items-center gap-4">
          {productGroupList
            ?.filter((productGroup) => productGroup.productGroup.isPrimary)
            .map((productGroup) => (
              <Link
                key={productGroup.productGroup.id}
                href={`/${lang}/booking-online/${productGroup.productGroup.id}/${formattedToday}?${SEARCH_DATE_PARAM}=${formattedToday}`}
                className="flex flex-col items-center"
              >
                <div className="relative w-24 h-24 lg:w-36 lg:h-36 block">
                  <Image
                    src={campingGroupImage}
                    alt="campingGroupImage"
                    className="absolute object-contain w-full h-full inset-0"
                  />
                </div>
                <span className="text-center">
                  {productGroup.productGroup.name}
                </span>
              </Link>
            ))}
        </div>
      </PageContainer>
    </>
  );
}
