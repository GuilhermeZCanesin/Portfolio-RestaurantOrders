"use client";

import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { Button } from "../button";
import { OrderContext } from "@/providers/order";
import { use } from "react";
import { calculateOrderTotal } from "@/lib/helpers/order";

export function OrderModal() {
  const { onRequestClose, order, finishOrder } = use(OrderContext);

  function handleCloseOrder() {
    onRequestClose();
  }
  async function handleFinishOrder() {
    await finishOrder(order?.id);
  }

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <div className={styles.header}>
          <h2>Order Details</h2>
          <button className={styles.dialogBack} onClick={handleCloseOrder}>
            <X className={styles.icon} />
          </button>
        </div>
        <form action={handleFinishOrder}>
          <section className={styles.info}>
            <span className={styles.table}>
              {order?.name && <span>{order.name} - </span>}
              Table <b>{order?.table}</b>
            </span>
            {order?.items.map((item) => (
              <section className={styles.details} key={item.id}>
                <span>
                  {item.quantity}x <b>{item.product.name}</b>
                </span>
                <span className={styles.description}>
                  {item.product.description}
                </span>
              </section>
            ))}
            <span className={styles.total}>
              <b>Order Total: </b> R$ {calculateOrderTotal(order)}
            </span>
          </section>
          <Button name="Complete Order" />
        </form>
      </section>
    </dialog>
  );
}
