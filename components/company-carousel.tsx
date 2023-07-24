"use client";

import Image from "next/image";
import carouselImage from "@/public/assets/carousel-banner.png";

export default function CompanyCarousel() {
  return (
    <div className="h-[350px] relative" id="company-carousel">
      <Image src={carouselImage} alt="banner" fill className="object-cover" />
    </div>
  );
}
