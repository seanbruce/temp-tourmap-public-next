"use client";

import clsx from "clsx";
import buttonClasses from "./button-classes";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className={clsx(...buttonClasses)}
      onClick={() => router.back()}
    >
      返回上頁
    </button>
  );
}
