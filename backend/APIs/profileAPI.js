import { Router } from "express";
import { createOrUpdateProfile, getMyProfile } from "../controllers/profile.js";
import { verifyToken } from "../middleware/verifyToken.js";

const profileRouter = Router();

profileRouter.post("/save", verifyToken(), createOrUpdateProfile);
profileRouter.get("/me", verifyToken(), getMyProfile);

export default profileRouter;