"use client";

import { floatActionButtonClasses } from "@/components/float-action-button/style";
import clsx from "clsx";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function QuickCheckButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={clsx(...floatActionButtonClasses, "w-full", "h-full")}
      disabled={pending}
    >
      {pending ? "結賬中..." : "快速結賬"}
    </button>
  );
}
