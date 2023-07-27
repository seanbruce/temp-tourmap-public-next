"use client";

import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer, faShop } from "@fortawesome/free-solid-svg-icons";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="overscroll-none">
      <body
        className={clsx(
          "flex",
          "flex-col",
          "items-stretch",
          "bg-black",
          "text-white",
          "bg-[url(/assets/background-image.gif)]",
          "bg-left",
          "bg-repeat"
        )}
      >
        <div className="relative mx-auto w-full lg:w-[980px] flex flex-col justify-center items-center max-[980px]:pt-[60px] min-h-[100dvh]">
          <h2 className="font-bold tracking-widest">
            <span>出錯啦，我們正在努力修復</span>
          </h2>
          <p className="mt-5 relative -left-2">
            <FontAwesomeIcon
              icon={faHammer}
              className="relative -top-5 origin-bottom-left animate-[hammering_1s_ease-in-out_infinite]"
            />
            <FontAwesomeIcon icon={faShop} className="text-3xl" />
          </p>
        </div>
      </body>
    </html>
  );
}
