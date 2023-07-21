import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import fbIcon from "@/public/assets/ico_fb.png";
import mailIcon from "@/public/assets/ico_mail.png";
import googleMapIcon from "@/public/assets/ico_googlemap.png";
import travelIcon from "@/public/assets/ico_travel.png";

import { footerNavItems } from "./navigation-items";

export default function Footer() {
  return (
    <footer className="h-[116px] max-sm:h-[32px] text-gray-300 text-sm font-extrabold flex flex-col justify-between">
      <nav className="flex justify-center max-[980px]:hidden">
        <ul className="flex items-center gap-7">
          {footerNavItems.map((item, index) => (
            <Fragment key={item.title}>
              <li>
                <Link href={item.to}>{item.title}</Link>
              </li>
              {index !== footerNavItems.length - 1 && (
                <li className="text-gray-300">:</li>
              )}
            </Fragment>
          ))}
        </ul>
      </nav>
      <address className="py-1.5 bg-black/50 flex justify-center items-center gap-6 not-italic  max-[980px]:hidden">
        <a
          href="http://www.facebook.com/pages/%E6%B3%B0%E5%AE%89%E8%A7%80%E6%AD%A2%E6%BA%AB%E6%B3%89%E6%9C%83%E9%A4%A8/115996015164990"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={fbIcon} alt="facebook icon" />
        </a>
        <a href="mailto:service@papawaqa.com.tw">
          <Image src={mailIcon} alt="email icon" />
        </a>
        <a href="http://goo.gl/maps/CqqJC" target="_blank" rel="noreferrer">
          <Image src={googleMapIcon} alt="google map icon" />
        </a>
        <span>
          訂購專線 ／ <a href="tel:+886-37-941-777">+886-37-941-777</a>
        </span>
        <span>
          傳真 ／ <a href="tel:+886-37-941-952">+886-37-941-952</a>
        </span>
      </address>
      <div className="flex justify-center items-center gap-1">
        <Image src={travelIcon} alt="travel icon" className="w-12" />
        <span>本系統由豐碩提供</span>
      </div>
    </footer>
  );
}
