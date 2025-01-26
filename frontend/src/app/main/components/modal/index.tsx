import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { Button } from "../button";

export function OrderModal() {
  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <div className={styles.header}>
          <h2>Order Details</h2>
          <button className={styles.dialogBack}>
            <X className={styles.icon} />
          </button>
        </div>
        <section className={styles.info}>
          <span className={styles.table}>
            Mesa <b>12</b>
          </span>
          <section className={styles.details}>
            <span>
              1 - <b>Pizza</b>
            </span>
            <span className={styles.description}>Pizza de frango</span>
          </section>
        </section>
        <Button name="Emit Order" />
      </section>
    </dialog>
  );
}
