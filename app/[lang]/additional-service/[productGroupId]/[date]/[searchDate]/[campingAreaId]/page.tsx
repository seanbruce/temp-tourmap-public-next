import Link from "next/link";
import BookingStepper from "@/components/booking-stepper";
import BreadCrumb from "@/components/bread-crumb";
import CompanyCarousel from "@/components/company-carousel";
import PageContainer from "@/components/page-container";
import Remark from "./_components/remark";
import Notice from "./_components/notice";
import PrimaryProductAndService from "./_components/primary-product-and-service";
import FloatActionButtons, {
  FloatActionButton,
} from "@/components/float-action-buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

interface PageProps {
  params: {
    lang: string;
    productGroupId: string;
    date: string;
    searchDate: string;
    campingAreaId: string;
  };
}

export default async function Page({
  params: { lang, productGroupId, date, searchDate, campingAreaId },
}: PageProps) {
  console.log({ lang, productGroupId, date, searchDate, campingAreaId });
  return (
    <>
      <CompanyCarousel />
      <BreadCrumb lang={lang} />
      <PageContainer>
        <BookingStepper currentStep={2} />
        <PrimaryProductAndService
          lang={lang}
          productGroupId={productGroupId}
          date={date}
          searchDate={searchDate}
          campingAreaId={campingAreaId}
        />
        <Remark />
        <Notice />
        <FloatActionButtons
          lang={lang}
          stepBackwardBtn={
            <FloatActionButton>
              <Link
                href={`/${lang}/booking-online/${productGroupId}/${date}/${searchDate}/${campingAreaId}#company-carousel`}
                className="w-full h-full inline-flex justify-center items-center"
              >
                <span className="inline-flex leading-none">
                  <FontAwesomeIcon icon={faCaretLeft} className="w-2 h-4" />
                  <span className="hidden laptop:inline ml-2 mr-2">STEP:2</span>
                  <span className="mr-2 translate-y-[0.5px]">選擇營位</span>
                </span>
              </Link>
            </FloatActionButton>
          }
          stepForwardBtn={
            <FloatActionButton>
              <Link
                href={`/${lang}/additional-service`}
                className="w-full h-full inline-flex justify-center items-center"
              >
                <span className="inline-flex leading-none">
                  <span className="hidden laptop:inline mr-2">STEP:4</span>
                  <span className="mr-2 translate-y-[0.5px]">填寫資料</span>
                  <FontAwesomeIcon icon={faCaretRight} className="w-2 h-4" />
                </span>
              </Link>
            </FloatActionButton>
          }
        />
      </PageContainer>
    </>
  );
}
