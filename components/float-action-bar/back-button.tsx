"use client";

import clsx from "clsx";
import { useState } from "react";
import buttonClasses from "./button-classes";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const [isGoBack, setIsGoBack] = useState(false);
  return (
    <button
      type="button"
      className={clsx(...buttonClasses)}
      disabled={isGoBack}
      onClick={() => {
        if (!isGoBack) {
          setIsGoBack(true);
          router.back();
        }
      }}
    >
      返回上頁
    </button>
  );
}
