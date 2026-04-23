import { Router } from "express";
import { LoginUser } from "../controllers/login.js";

const loginRouter = Router();

loginRouter.post("/", LoginUser);

export default loginRouter;