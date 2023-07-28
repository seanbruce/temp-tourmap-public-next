"use server";
import { getCartByUser } from "@/apis/get-cart-by-user";
import { getPrimaryProductDetail } from "@/apis/get-primary-product-detail";
import FloatActionBar from "@/components/float-action-bar";
import PageContainer from "@/components/page-container";
import AddCartButton from "./_components/add-cart-button";
import RemoveCartButton from "./_components/remove-cart-button";
import Carousel from "@/components/carousel";
import "./_components/editor-display.css";

interface PageProps {
  params: {
    id: string;
    date: string;
  };
}

export default async function Page({ params: { id, date } }: PageProps) {
  const primaryProductDetailData = getPrimaryProductDetail({
    path: { productId: id },
    query: { date },
  });

  const cartData = getCartByUser();

  const [primaryProductDetail, cart] = await Promise.all([
    primaryProductDetailData,
    cartData,
  ]);

  const projectDescription = primaryProductDetail.project.description ?? "";
  const productDescription = primaryProductDetail.product.description ?? "";

  const isInCart = cart?.shoppingCartItems?.find(
    (item) =>
      `${item.productId}${item.date}` === `${id}${decodeURIComponent(date)}`
  );

  const images = primaryProductDetail.campingImages?.map(({ id }) => id) ?? [];
  return (
    <PageContainer>
      <div className="w-full h-[400px] mx-auto mb-4">
        {images.length > 0 ? (
          <Carousel
            images={
              primaryProductDetail.campingImages?.map(({ id }) => id) ?? []
            }
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center text-white bg-black/50">
            <span>暫無圖片</span>
          </div>
        )}
      </div>
      <p className="text-xl font-bold mb-2">
        {primaryProductDetail.product.displayName}
      </p>
      <div className="mb-4">
        <p className="border-b border-brand-gold">產品說明</p>
        {projectDescription ? (
          <div
            className="p-2 e-rte-content mb-2"
            dangerouslySetInnerHTML={{
              __html: projectDescription,
            }}
          />
        ) : (
          <div>暫無說明</div>
        )}
        <p className="border-b border-brand-gold">專案說明</p>
        {productDescription ? (
          <div
            className="p-2 e-rte-content"
            dangerouslySetInnerHTML={{
              __html: productDescription,
            }}
          />
        ) : (
          <div>暫無說明</div>
        )}
      </div>
      <p className="flex justify-between items-end mb-4">
        <span>產品價格</span>
        <span>
          NTD$
          <span className="ml-2 text-xl text-brand-gold">
            {primaryProductDetail.price}
          </span>
        </span>
      </p>
      <div className="mb-8">
        <p className="text-brand-gold">產品內免費附加服務</p>
        <ul className=" text-sm py-2">
          <li className="flex justify-between">
            <span>柿餅</span>
            <span>* 2(個)</span>
          </li>
          <li className="flex justify-between">
            <span>湯屋</span>
            <span>* 2(次)</span>
          </li>
          <li className="flex justify-between">
            <span>運動飲料</span>
            <span>* 1(箱)</span>
          </li>
          <li className="flex justify-between">
            <span>免費接送</span>
            <span>* 1(次)</span>
          </li>
        </ul>
      </div>

      <FloatActionBar
        action={
          isInCart ? (
            <RemoveCartButton id={id} date={date} />
          ) : (
            <AddCartButton id={id} date={date} />
          )
        }
      />
    </PageContainer>
  );
}
