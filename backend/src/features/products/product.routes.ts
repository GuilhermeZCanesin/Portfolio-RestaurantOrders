import { Router } from "express";
import { authenticate } from "../../middlewares/authentication";
import { createProduct, deleteProduct, getProduct, getProducts } from "./product.controller";
const productRoutes = Router();

productRoutes.get("/:id", authenticate, getProduct);
productRoutes.get("/", authenticate, getProducts);
productRoutes.post("/", authenticate, createProduct);
productRoutes.delete("/:id", authenticate, deleteProduct);

export default productRoutes;