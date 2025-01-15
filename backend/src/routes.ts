import { Router } from "express";
import userRoutes from "./features/users/user.routes";
import categoryRoutes from "./features/categories/category.routes";
import productRoutes from "./features/products/product.routes";
import orderRoutes from "./features/orders/order.routes";
import itemRoutes from "./features/orders/items/item.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);
router.use("/order/item", itemRoutes);

export default router;