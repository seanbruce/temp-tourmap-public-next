"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { FloatActionButton } from "@/components/float-action-bar";
import { quickCheckAction } from "@/actions/quick-check-action";

export default function QuickCheckButton() {
  const { pending, action } = useFormStatus();
  return (
    <FloatActionButton
      type="submit"
      formAction={quickCheckAction}
      disabled={pending && action === quickCheckAction}
      className="w-full h-full"
    >
      {pending && action === quickCheckAction ? "結賬中..." : "快速結賬"}
    </FloatActionButton>
  );
}
