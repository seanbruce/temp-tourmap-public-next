import BreadCrumb from "@/components/bread-crumb";
import CompanyCarousel from "@/components/company-carousel";
import PageContainer from "@/components/page-container";
import CampingCarousel from "./_components/camping-carousel";
import BookingStepper from "@/components/booking-stepper";
import Calender from "./_components/calender";

interface BookingOnlinePageProps {
  params: {
    lang: string;
    productGroupId: string;
    date: string;
    searchDate: string;
  };
}

export default function BookingOnlinePage({
  params: { lang, productGroupId, date, searchDate },
}: BookingOnlinePageProps) {
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
