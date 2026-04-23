import { Router } from "express";
import { LogoutUser } from "../controllers/logout.js";

const logoutRouter = Router();

logoutRouter.post("/", LogoutUser);

export default logoutRouter;