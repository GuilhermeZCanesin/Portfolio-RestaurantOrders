"use client";
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { CookieValueTypes } from "cookies-next";
import { redirect, useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  banner: string;
  category_id: string;
}

interface OrderItem {
  id: string;
  quantity: string;
  updated_at: Date | string;
  product: OrderProduct;
}

export interface OrderDetailsProps {
  id: string;
  name: string; 
  table: number;
  status: boolean;
  draft: string;
  updated_at: Date | string;
  items: OrderItem[];
}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (orderId: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderDetailsProps;
  finishOrder: (orderId: string) => Promise<void>;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderDetailsProps>(
    {} as OrderDetailsProps
  );

  async function getToken(): Promise<CookieValueTypes> {
    return await getCookieClient();
  }

  async function onRequestOpen(orderId: string) {
    const response = await api.get<OrderDetailsProps>("/order", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        id: orderId,
      },
    });
    setOrder(response.data);
    setIsOpen(true);
  }
  function onRequestClose() {
    setIsOpen(false);
  }
  async function finishOrder(orderId: string) {
    const data = {
      id: orderId,
      status: true,
    };

    try {
      await api.put("/order", data, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setIsOpen(false);
      router.refresh();
      toast.success("Order Emitted Successfully!");
    } catch (err) {
      console.log(err);
      toast.success("Error Emitting Order!");
      return;
    }
  }
  return (
    <OrderContext.Provider
      value={{ isOpen, order, onRequestOpen, onRequestClose, finishOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
