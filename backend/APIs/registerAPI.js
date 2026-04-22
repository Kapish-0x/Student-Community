import { Router } from "express";
import { registerUser } from "../controllers/register.js";

const registerRouter = new Router();

registerRouter.post("/", registerUser);

export default registerRouter;
