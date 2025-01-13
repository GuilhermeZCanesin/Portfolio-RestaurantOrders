import { Router } from "express";
import userRoutes from "./features/users/user.routes";

const router = Router();

router.use("/users", userRoutes)

export default router;