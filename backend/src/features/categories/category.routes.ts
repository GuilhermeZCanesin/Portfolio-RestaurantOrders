import { Router } from "express";
import { authenticate } from "../../middlewares/authentication";
import { createCategory, getCategories, deleteCategory } from "./category.controller";
const categoryRoutes = Router();

categoryRoutes.get("/", authenticate, getCategories);
categoryRoutes.post("/", authenticate, createCategory);
categoryRoutes.delete("/:id", authenticate, deleteCategory);

export default categoryRoutes;