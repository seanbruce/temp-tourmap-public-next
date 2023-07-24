"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      className={clsx("text-slate-900 py-1 px-2", className)}
      {...props}
      ref={ref}
    />
  );
});
