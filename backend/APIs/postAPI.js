import { Router } from "express";
import { createPost } from "../controllers/post.js";
import { upload } from "../middleware/multer.js";
import { verifyToken } from "../middleware/auth.js"; 

const router = Router();

router.post("/create", verifyToken, upload.single("image"), createPost);

export default router;