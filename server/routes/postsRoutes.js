import { Router } from "express";
import auth from "../controllers/authMiddleware.js";
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postController.js";

// import auth from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/", getPost);
router.post("/", auth,createPost);
router.patch("/:id", auth,updatePost);
router.patch("/:id/likePost",auth, likePost);
router.delete("/:id", auth,deletePost);

export default router;
