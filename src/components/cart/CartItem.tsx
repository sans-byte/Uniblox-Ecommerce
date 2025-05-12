import type { CartItem as CartItemType } from "@/types";
import type React from "react";

type Prop = {
  item: CartItemType;
};

export const CartItem: React.FC<Prop> = ({ item }) => {
  return <></>;
};
