"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function QuickCheckButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="inline-flex items-center"
      disabled={pending}
    >
      {pending ? "結賬中..." : "快速結賬"}
    </button>
  );
}
