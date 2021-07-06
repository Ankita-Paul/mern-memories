import { Router } from "express";
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost
} from "../controllers/postController.js";
const router = Router();

router.get("/", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.patch("/:id/likePost", likePost);
router.delete("/:id", deletePost);

export default router;
