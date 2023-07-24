import { getCartByUser } from "@/apis/get-cart-by-user";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clsx } from "clsx";
import Link from "next/link";

type FloatActionButtonProps = Pick<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "disabled" | "children" | "onClick"
>;

function FloatActionButton({ disabled, children }: FloatActionButtonProps) {
  return (
    <button
      className={clsx(
        "border-black",
        "text-black",
        "hover:bg-brand-gold-dark",
        "px-4",
        "max-sm:px-1",
        "py-1",
        "font-bold",
        "[.center-btn_&]:border",
        "disabled:text-slate-500",
        "disabled:border-slate-500"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

interface FloatActionButtonsProps {
  lang: string;
  stepBackwardBtn: React.ReactNode;
  stepForwardBtn: React.ReactNode;
  showCart?: boolean;
  float?: boolean;
}

export default async function FloatActionButtons({
  lang,
  stepBackwardBtn,
  stepForwardBtn,
  showCart = true,
  float = true,
}: FloatActionButtonsProps) {
  const cart = await getCartByUser();
  const itemsCount =
    cart && cart.shoppingCartItems && cart.shoppingCartItems.length > 0 ? (
      <div
        className={clsx(
          "absolute",
          "text-xs",
          "-top-1",
          "right-0",
          "rounded-full",
          "bg-red-500",
          "w-6",
          "h-6",
          "flex",
          "justify-center",
          "items-center",
          "text-white",
          "font-bold",
          "leading-none",
          "max-sm:w-6",
          "max-sm:h-6",
          "max-sm:text-xs"
        )}
      >
        {cart.shoppingCartItems.length}
      </div>
    ) : null;
  return (
    <div
      className={clsx(
        "h-14",
        "bg-brand-gold",
        "bottom-0",
        "grid",
        "grid-cols-3",
        "max-sm:text-sm",
        "z-20",
        float ? "sticky" : "static"
      )}
    >
      {stepBackwardBtn ?? <div />}
      {stepForwardBtn}
      {showCart ? (
        <div className="flex justify-center items-center hover:bg-brand-gold-dark cursor-pointer">
          <Link
            href={`/${lang}/user-cart`}
            prefetch={false}
            className="relative text-black px-6 py-1 rounded-md font-bold flex items-center"
          >
            <FontAwesomeIcon
              icon={faCartArrowDown}
              size="sm"
              className="mr-2 w-4"
            />
            購物車
            {itemsCount}
          </Link>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export { FloatActionButton };
