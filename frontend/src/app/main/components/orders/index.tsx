"use client";

import { use } from "react";
import { RefreshCwIcon } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderPropsDTO } from "@/lib/interface/order.type";
import { OrderModal } from "../modal";
import { OrderContext } from "@/providers/order";

interface Props {
  orders: OrderPropsDTO[];
}
export function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = use(OrderContext);
  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Recent Orders</h1>
          <button>
            <RefreshCwIcon className={styles.refresh} />
          </button>
        </section>
        <section className={styles.listOrders}>
          {orders.map((order) => (
            <button key={order.id} className={styles.orderItem}>
              <div className={styles.tag}></div>
              <span>
                Mesa {order.table}: {order.name}
              </span>
            </button>
          ))}
        </section>
      </main>
      {isOpen && <OrderModal />}
    </>
  );
}
