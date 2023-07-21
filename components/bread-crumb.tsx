import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";

interface BreadCrumbProps {
  lang: string;
}

export default function BreadCrumb({ lang }: BreadCrumbProps) {
  const fakeBreadScrub = [
    <Link key="1" href={`/${lang}/booking-online`}>
      線上訂房
    </Link>,
    <Link key="2" href={`/${lang}/booking-notice`}>
      訂位須知
    </Link>,
    <Link key="3" href={`/${lang}/booking-history`}>
      訂單查詢
    </Link>,
  ];
  return (
    <div className={clsx("flex items-center px-2", `h-[52px]`)}>
      <nav className="h-full">
        <ul className="h-full flex flex-nowrap items-stretch">
          {fakeBreadScrub.map((crumb, index) => (
            <Fragment key={index}>
              <li
                className={clsx(
                  "text-sm text-gray-300 px-4 cursor-pointer align-middle hover:underline",
                  `leading-[52px]`
                )}
              >
                {crumb}
              </li>
              {index !== fakeBreadScrub.length - 1 && (
                <li className="text-sm text-gray-300 cursor-pointer align-middle leading-[52px]">
                  /
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
}
