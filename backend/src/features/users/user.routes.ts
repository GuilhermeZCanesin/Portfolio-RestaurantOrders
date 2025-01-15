import { Router } from "express";
import { createUser, getUser, getUsers, authUser} from "./user.controller";
import { authenticate } from "../../middlewares/authentication";
const userRoutes = Router();

userRoutes.get("/", authenticate, getUsers);
userRoutes.get("/info", authenticate, getUser);
userRoutes.post("/", createUser);
userRoutes.post("/session", authUser);

export default userRoutes;