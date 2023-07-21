import BreadCrumb from "@/components/bread-crumb";
import CompanyCarousel from "@/components/company-carousel";
import PageContainer from "@/components/page-container";
import CampingCarousel from "./_components/camping-carousel";
import BookingStepper from "@/components/booking-stepper";
import { SEARCH_DATE_PARAM } from "@/utils/constants";
import Calender from "./_components/calender";

interface BookingOnlinePageProps {
  params: { lang: string; productGroupId: string; date: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function BookingOnlinePage({
  params: { lang, productGroupId, date },
  searchParams,
}: BookingOnlinePageProps) {
  const searchDate = searchParams[SEARCH_DATE_PARAM];
  if (typeof searchDate !== "string")
    return <div>{SEARCH_DATE_PARAM} is not correct, check code</div>;
  return (
    <>
      <CompanyCarousel />
      <BreadCrumb lang={lang} />
      <PageContainer>
        <CampingCarousel />
        <BookingStepper currentStep={2} />
        <Calender
          lang={lang}
          productGroupId={productGroupId}
          date={date}
          searchDate={searchDate}
        />
      </PageContainer>
    </>
  );
}
