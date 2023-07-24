"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { removePrimaryProductToCart } from "@/actions/cart-actions";
import { FloatActionButton } from "@/components/float-action-bar";
import clsx from "clsx";
import buttonClasses from "@/components/float-action-bar/button-classes";

function ActualButton() {
  const { pending } = useFormStatus();
  return (
    <FloatActionButton type="submit" disabled={pending} className="h-full">
      {pending ? "移除中..." : "移除購物車"}
    </FloatActionButton>
  );
}

interface RemoveCartButtonProps {
  id: string;
  date: string;
}

export default function RemoveCartButton({ id, date }: RemoveCartButtonProps) {
  return (
    <form
      action={removePrimaryProductToCart}
      className="flex-auto flex justify-center items-center"
    >
      <input type="hidden" name="skuId" value={id} readOnly />
      <input type="hidden" name="date" value={date} readOnly />
      <ActualButton />
    </form>
  );
}
