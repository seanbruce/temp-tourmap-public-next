"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { addPrimaryProductToCart } from "@/actions/cart-actions";
import { FloatActionButton } from "@/components/float-action-bar";

function ActualButton() {
  const { pending } = useFormStatus();
  return (
    <FloatActionButton type="submit" disabled={pending} className="h-full">
      {pending ? "加入中..." : "加入購物車"}
    </FloatActionButton>
  );
}

interface AddCartButtonProps {
  id: string;
  date: string;
}

export default function AddCartButton({ id, date }: AddCartButtonProps) {
  return (
    <form
      action={addPrimaryProductToCart}
      className="flex-auto flex justify-center items-center"
    >
      <input type="hidden" name="skuId" value={id} readOnly />
      <input type="hidden" name="date" value={date} readOnly />
      <ActualButton />
    </form>
  );
}
