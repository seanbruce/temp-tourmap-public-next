import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import CompanyCarousel from "@/components/company-carousel";
import PageContainer from "@/components/page-container";
import { getProductGroupList } from "@/apis/get-product-group-list";
import campingGroupImage from "./_assets/camping.png";
import { getCampingAreaList } from "@/apis/get-camping-area-list";

interface BookingOnlinePageProps {
  params: { lang: string };
}

export default async function BookingOnlinePage({
  params: { lang },
}: BookingOnlinePageProps) {
  const productGroupListData = getProductGroupList();
  const campingAreaListData = getCampingAreaList();
  const [productGroupList, campingAreaList] = await Promise.all([
    productGroupListData,
    campingAreaListData,
  ]);
  const formattedToday = dayjs().format("YYYY-MM-DD");

  const getHref = (productGroupId: string) => {
    let href = `/${lang}/booking-online/${productGroupId}/${formattedToday}/${formattedToday}`;
    if (formattedToday.length > 0) {
      href += `/${campingAreaList[0].id}#company-carousel`;
    }
    return href;
  };
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
                href={getHref(productGroup.productGroup.id)}
                className="flex flex-col items-center"
                scroll={true}
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
