import PageContainer from "@/components/page-container";
import { TypeFood } from "./_components/type-food";
import TypeFree from "./_components/type-free";

interface PageProps {
  params: {
    lang: string;
    productId: string;
    productDate: string;
    type: string;
  };
}

type SelectorType = "food" | "everything" | "free";
const selectorType: SelectorType[] = ["food", "everything", "free"];

export default function Page({
  params: { lang, productId, productDate, type },
}: PageProps) {
  if (!selectorType.includes(type as SelectorType)) throw Error();

  let typeSelector = null;
  switch (type as SelectorType) {
    case "everything":
      typeSelector = null;
      break;
    case "food":
      typeSelector = <TypeFood id={productId} date={productDate} />;
      break;
    case "free":
      typeSelector = <TypeFree id={productId} date={productDate} />;
  }

  return (
    <PageContainer>
      {typeSelector}
      {/* <FloatActionBar /> */}
    </PageContainer>
  );
}
