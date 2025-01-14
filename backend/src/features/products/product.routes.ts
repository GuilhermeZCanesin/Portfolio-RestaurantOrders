import { Router } from "express";
import multer from "multer";

import { authenticate } from "../../middlewares/authentication";
import { createProduct, deleteProduct, getProductsByCategory, getProducts } from "./product.controller";
const productRoutes = Router();

import uploadConfig from "../../config/multer";

const upload = multer(uploadConfig.upload("./tmp"));

productRoutes.get("/category", authenticate, getProductsByCategory);
productRoutes.get("/", authenticate, getProducts);
productRoutes.post("/", authenticate, upload.single('file'), createProduct);
productRoutes.delete("/:id", authenticate, deleteProduct);

export default productRoutes;