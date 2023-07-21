"use client";
import { clsx } from "clsx";

type ButtonConfig = { variant?: "flat" | "stroked"; color?: "gold" | "gray" };

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonConfig;

const getButtonColorByConfig = ({
  color = "gold",
  variant = "flat",
}: ButtonConfig) => {
  switch (variant) {
    case "flat":
      switch (color) {
        case "gold":
          return "bg-brand-gold hover:bg-brand-gold-dark text-black disabled:bg-gray-200";
        case "gray":
          return "bg-gray-400 text-white hover:bg-gray-500 text-black";
        default: {
          const _never: never = color;
          throw Error(_never);
        }
      }
    case "stroked":
      switch (color) {
        case "gold":
          return "border-2 border-brand-gold hover:border-brand-gold-dark text-brand-gold hover:text-brand-gold-dark";
        case "gray":
          return "border-2 border-gray-400 hover:border-gray-500 text-gray-400 hover:text-gray-500";
        default: {
          const _never: never = color;
          throw Error(_never);
        }
      }
    default: {
      const _never: never = variant;
      throw Error(_never);
    }
  }
};

export default function Button({
  className,
  children,
  variant = "flat",
  color = "gold",
  ...props
}: ButtonProps) {
  const basicClassName = "px-2.5 py-2 text-sm transition-colors ";

  return (
    <button
      className={clsx(
        basicClassName,
        getButtonColorByConfig({ variant, color }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
