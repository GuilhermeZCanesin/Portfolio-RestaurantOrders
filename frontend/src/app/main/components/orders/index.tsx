"use client";

import { use, useState } from "react";
import { RefreshCwIcon } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderPropsDTO } from "@/lib/interface/order.type";
import { OrderModal } from "../modal";
import { OrderContext } from "@/providers/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  orders: OrderPropsDTO[];
}

export function Orders({ orders }: Props) {
  const router = useRouter();
  const { isOpen, onRequestOpen } = use(OrderContext);

  async function handleDetailOrder(orderId: string) {
    await onRequestOpen(orderId);
  }

  async function handleRefresh() {
    toast.success("Orders Updated Successfully!");
    router.refresh();
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Recent Orders</h1>
          <button>
            <RefreshCwIcon className={styles.refresh} onClick={handleRefresh} />
          </button>
        </section>
        <section className={styles.listOrders}>
          {!orders.length && (
            <span className={styles.emptyList}>
              No recent orders available...
            </span>
          )}
          {orders.map((order) => (
            <button
              key={order.id}
              className={styles.orderItem}
              onClick={() => handleDetailOrder(order.id)}
            >
              <div className={styles.tag}></div>
              <span>
                <b>Table {order.table} </b>
                {order?.name ? `- ${order?.name}` : ""}
              </span>
            </button>
          ))}
        </section>
      </main>
      {isOpen && <OrderModal />}
    </>
  );
}
