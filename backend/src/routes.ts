import { Router } from "express";
import userRoutes from "./features/users/user.routes";
import categoryRoutes from "./features/categories/category.routes";
import productRoutes from "./features/products/product.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;