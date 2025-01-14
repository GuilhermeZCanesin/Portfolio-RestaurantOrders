import { Router } from "express";
import userRoutes from "./features/users/user.routes";
import categoryRoutes from "./features/categories/category.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);

export default router;