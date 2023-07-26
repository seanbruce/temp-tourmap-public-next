import { getCartByUser } from "@/apis/get-cart-by-user";
import clsx from "clsx";

export default async function CartBadge() {
  const cart = await getCartByUser();
  return cart && cart.shoppingCartItems && cart.shoppingCartItems.length > 0 ? (
    <div
      className={clsx(
        "absolute",
        "text-xs",
        "-top-1",
        "left-full",
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
}
