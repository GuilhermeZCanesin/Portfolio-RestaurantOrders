import { RefreshCwIcon } from "lucide-react";
import styles from "./styles.module.scss";

export function Orders() {
  return (
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1>Recent Orders</h1>
        <button>
          <RefreshCwIcon className={styles.refresh} />
        </button>
      </section>
      <section className={styles.listOrders}>
        <button className={styles.orderItem}>
          <div className={styles.tag}></div>
          <span>Mesa 18</span>
        </button>
        <button className={styles.orderItem}>
          <div className={styles.tag}></div>
          <span>Mesa 20</span>
        </button>
      </section>
    </main>
  );
}
