import { Router } from "express";
import { authenticate } from "../../../middlewares/authentication";
import { addItemToOrder, removeItemFromOrder, getOrderItems } from "./item.controller";
const itemRoutes = Router();

itemRoutes.get("/", authenticate, getOrderItems);
itemRoutes.post("/", authenticate, addItemToOrder);
itemRoutes.delete("/", authenticate, removeItemFromOrder);

export default itemRoutes;