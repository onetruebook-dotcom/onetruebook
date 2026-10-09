"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/components/CartProvider";

type Props = {
  item: CartItem;
  className?: string;
  label?: string;
};

export function AddToCartButton({ item, className = "", label = "Add to cart" }: Props) {
  const { addItem, has } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = has(item.slug) || justAdded;

  return (
    <button
      type="button"
      onClick={() => {
        addItem(item);
        setJustAdded(true);
      }}
      className={className}
    >
      {inCart ? "In your cart" : label}
    </button>
  );
}
