import { getCartByUser } from "@/apis/get-cart-by-user";
import clsx from "clsx";
import dayjs from "dayjs";
import FloatActionBar from "@/components/float-action-bar";
import PageContainer from "@/components/page-container";
import Section from "@/components/section";
import QuickCheckButton from "./_components/quick-check-button";
import { quickCheckAction } from "@/actions/quick-check-action";

function Attribute({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col max-sm:flex-row justify-between",
        className
      )}
    >
      <p className="text-base text-brand-gold whitespace-nowrap mr-2">
        {title}:
      </p>
      <p className="text-base">{children}</p>
    </div>
  );
}

export default async function Page() {
  const cart = await getCartByUser();

  if (cart.shoppingCartItems?.length === 0) {
    return (
      <PageContainer>
        <div className="h-56 flex flex-col justify-center items-center font-bold text-brand-gold">
          <p>泰安覓境露營區</p>
          <p>目前還沒選購產品</p>
        </div>
        <FloatActionBar />
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <h1 className="pt-8 pb-4 max-sm:pt-16 text-brand-gold text-xl font-bold text-center ">
        我的購物車
      </h1>
      <Section title="產品及附加服務" className="mb-8">
        {cart.shoppingCartItems?.map((primaryProduct) => (
          <div
            key={`${primaryProduct.productId}${primaryProduct.date}`}
            className="bg-stone-900 rounded mb-16 last-of-type:mb-0 border border-brand-green"
          >
            <div className="p-8 max-sm:p-4 border-b border-brand-green grid grid-cols-4 gap-2 max-sm:grid-cols-1">
              <Attribute title="產品名稱" className="col-span-full">
                {primaryProduct.productName}
              </Attribute>
              <Attribute title="入住時間">
                {dayjs(primaryProduct.date).format("YYYY-MM-DD")}
              </Attribute>
              <Attribute title="加人數量">未知</Attribute>
              <Attribute title="小計">NTD ${primaryProduct.price}</Attribute>
            </div>
            <div className="p-8 pt-4 max-sm:p-4 max-sm:pt-2">
              <p className="mb-4 text-brand-gold font-bold  pb-2">附加服務</p>
              {primaryProduct.additionItems?.length === 0 ? (
                <p className="font-bold h-32 flex justify-center items-center text-sm">
                  無附加服務
                </p>
              ) : (
                <div className="flex flex-col gap-12">
                  {primaryProduct.additionItems?.map((additionProduct) => (
                    <div
                      key={additionProduct.extraProductId}
                      className="grid grid-cols-3 gap-2 max-sm:grid-cols-1"
                    >
                      <Attribute title="附加服務名稱" className="col-span-full">
                        {additionProduct.extraProductName}
                      </Attribute>
                      <Attribute title={additionProduct.amount.title ?? ""}>
                        {additionProduct.amount.amount}
                        {additionProduct.amount.unit}
                      </Attribute>
                      <Attribute
                        title={additionProduct.primarySpec.unitName ?? ""}
                      >
                        {additionProduct.primarySpec.selectedOption}
                      </Attribute>
                      <Attribute
                        title={additionProduct.secondarySpec.unitName ?? ""}
                      >
                        {additionProduct.secondarySpec.selectedOption}
                      </Attribute>
                      {/* <Attribute
                        title={additionProduct.primaryTimeSpec.dateTitle}
                      >
                        {additionProduct.primaryTimeSpec.date}
                      </Attribute> */}
                      <Attribute
                        title={additionProduct.primaryTimeSpec.timeTitle ?? ""}
                      >
                        {additionProduct.primaryTimeSpec.time}
                      </Attribute>
                      {/* <Attribute
                        title={additionProduct.secondaryTimeSpec.dateTitle}
                      >
                        {additionProduct.secondaryTimeSpec.date}
                      </Attribute> */}
                      <Attribute
                        title={
                          additionProduct.secondaryTimeSpec.timeTitle ?? ""
                        }
                      >
                        {additionProduct.secondaryTimeSpec.time}
                      </Attribute>
                      <Attribute title="小計" className="col-span-full">
                        NTD$ {additionProduct.totalPrice}
                      </Attribute>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </Section>
      <Section title="其它備註">{cart.customerRemark}</Section>

      <FloatActionBar
        action={
          <form action={quickCheckAction} className="flex-auto">
            <QuickCheckButton />
          </form>
        }
      />
    </PageContainer>
  );
}
