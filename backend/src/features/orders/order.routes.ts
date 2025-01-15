import { Router } from "express";
import multer from "multer";

import { authenticate } from "../../middlewares/authentication";
import { createOrder, deleteOrder, getOrders, updateOrder } from "./order.controller";
const orderRoutes = Router();

orderRoutes.get("/", authenticate, getOrders);
orderRoutes.post("/", authenticate, createOrder);
orderRoutes.put("/", authenticate, updateOrder);
orderRoutes.delete("/", authenticate, deleteOrder);

export default orderRoutes;