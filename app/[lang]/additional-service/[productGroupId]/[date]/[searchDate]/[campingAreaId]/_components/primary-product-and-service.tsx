import Section from "@/components/section";
import cart from "./fake-cart.json";
import ProductAndServiceItem from "./primary-product-and-service/product-and-service-item";

interface PrimaryProductAndServiceProps {
  lang: string;
  productGroupId: string;
  date: string;
  searchDate: string;
  campingAreaId: string;
}

export default function PrimaryProductAndService({
  lang,
  productGroupId,
  date,
  searchDate,
  campingAreaId,
}: PrimaryProductAndServiceProps) {
  return (
    <Section title="選擇附加服務" className="product">
      <div className="grid grid-cols-1 gap-4 mb-12">
        {cart.shoppingCartItems.map(
          (
            {
              primaryProductSkuId,
              productSkuName,
              date: productDate,
              price,
              people,
            },
            index
          ) => (
            <ProductAndServiceItem
              key={index}
              lang={lang}
              productGroupId={productGroupId}
              date={date}
              searchDate={searchDate}
              campingAreaId={campingAreaId}
              primaryProductSkuId={primaryProductSkuId}
              primaryProductName={productSkuName}
              productDate={productDate}
              people={people}
              price={price}
            />
          )
        )}
      </div>
    </Section>
  );
}
