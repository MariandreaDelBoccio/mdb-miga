import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CakeConfig } from "./data";
import { priceFor } from "./data";

export type CartItem = {
  id: string;
  config: CakeConfig;
  price: number;
  label: string;
};

type CartValue = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (config: CakeConfig, label: string) => void;
  remove: (id: string) => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const value = useMemo<CartValue>(() => {
    const add = (config: CakeConfig, label: string) => {
      setItems((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          config,
          price: priceFor(config),
          label,
        },
      ]);
      setOpen(true);
    };

    const remove = (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return {
      items,
      count: items.length,
      total: items.reduce((sum, item) => sum + item.price, 0),
      open,
      setOpen,
      add,
      remove,
    };
  }, [items, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
