import { api } from "@/services/api";
import { Orders } from "./components/orders";
import { getCookieServer } from "@/lib/cookieServer";
import { OrderPropsDTO } from "@/lib/interface/order.type";

async function getOrders(): Promise<OrderPropsDTO[] | []> {
  const token = await getCookieServer();
  try {
    const response = await api.get("/order", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function Main() {
  const orders = await getOrders();

  return (
    <>
      <Orders orders={orders} />
    </>
  );
}
