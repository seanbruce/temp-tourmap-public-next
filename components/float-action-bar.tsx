"use client";
import { clsx } from "clsx";
import buttonClasses from "./float-action-bar/button-classes";
import BackButton from "./float-action-bar/back-button";

type FloatActionButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function FloatActionButton({
  disabled,
  children,
  className,
}: FloatActionButtonProps) {
  return (
    <button className={clsx(...buttonClasses, className)} disabled={disabled}>
      {children}
    </button>
  );
}

interface FloatGoBackButtonProps {
  action?: React.ReactNode;
}

export default function FloatActionBar({ action }: FloatGoBackButtonProps) {
  return (
    <div
      className={clsx(
        "mt-8",
        "h-14",
        "bg-brand-gold",
        "bottom-0",
        "flex",
        "flex-nowrap",
        "max-sm:text-sm",
        "sticky"
      )}
    >
      <BackButton />
      {action ? (
        <>
          <div className="w-[1px] h-1/2 bg-brand-gold-dark self-center" />
          {action}
        </>
      ) : null}
    </div>
  );
}

export { FloatActionButton };
