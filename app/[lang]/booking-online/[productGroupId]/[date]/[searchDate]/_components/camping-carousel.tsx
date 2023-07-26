"use client";

import campingImage from "@/public/assets/camping.jpg";
import Carousel from "@/components/carousel";

export default function CampingCarousel() {
  return (
    <div className="w-full h-[400px] mx-auto mb-3 relative overflow-hidden">
      <Carousel images={[campingImage]} />
    </div>
  );
}
