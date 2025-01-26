import { OrderDetailsProps } from "@/providers/order";

export function calculateOrderTotal(order: OrderDetailsProps) {
  return order.items.reduce((total, item) => {
    const itemsTotal = item.product.price * parseInt(item.quantity);
    return total + itemsTotal;
  }, 0);
}
