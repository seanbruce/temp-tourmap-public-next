"use client";

import Image from "next/image";
import campingImage from "@/public/assets/camping.jpg";

export default function CampingCarousel() {
  return (
    <div className="w-full h-[400px] mx-auto mb-3 relative overflow-hidden">
      <Image src={campingImage} alt="camping" fill className="object-cover" />
    </div>
  );
}
