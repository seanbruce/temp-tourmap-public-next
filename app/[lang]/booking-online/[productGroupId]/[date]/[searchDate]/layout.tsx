import { Suspense } from "react";
import BreadCrumb from "@/components/bread-crumb";
import CompanyCarousel from "@/components/company-carousel";
import PageContainer from "@/components/page-container";
import CampingCarousel from "./_components/camping-carousel";
import BookingStepper from "@/components/booking-stepper";
import Calender from "./_components/calender";
import Discount from "./_components/discount";
import ScrollToTopButton from "@/components/scroll-to-top-button";

interface LayoutProps {
  params: {
    lang: string;
    productGroupId: string;
    date: string;
    searchDate: string;
  };
  children: React.ReactNode;
}

export default async function Layout({
  params: { lang, productGroupId, date, searchDate },
  children,
}: LayoutProps) {
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
        <Discount />
        {children}
        <ScrollToTopButton target="calender" />
      </PageContainer>
    </>
  );
}
