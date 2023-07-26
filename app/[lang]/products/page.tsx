import { Suspense } from "react";
import CompanyCarousel from "@/components/company-carousel";
import PageContainer from "@/components/page-container";
import { getProductGroupList } from "@/apis/get-product-group-list";
import { getCampingAreaList } from "@/apis/get-camping-area-list";
import ProductGroupLink, {
  Loading as ProductGroupLinkLoading,
} from "./_components/product-group-link";

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

  if (campingAreaList.length === 0) {
    return <div>未找到露營區</div>;
  }

  const firstCampingAreaId = campingAreaList[0].id;
  return (
    <>
      <CompanyCarousel />
      <PageContainer>
        <div className="flex items-center gap-4">
          {productGroupList
            ?.filter((productGroup) => productGroup.productGroup.isPrimary)
            .map((productGroup) => (
              <Suspense
                key={productGroup.productGroup.id}
                fallback={<ProductGroupLinkLoading />}
              >
                <ProductGroupLink
                  lang={lang}
                  campingAreaId={firstCampingAreaId}
                  productGroup={productGroup}
                />
              </Suspense>
            ))}
        </div>
      </PageContainer>
    </>
  );
}
