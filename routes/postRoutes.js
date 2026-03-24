import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  addComment,
  getPostsByTag,
  getPostsByAuthor
} from "../controllers/postController.js";

const router = Router();

// CRUD básico
router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

// Añadir comentario
router.post("/:id/comments", addComment);

// Búsqueda avanzada
router.get("/tag/:tag", getPostsByTag);
router.get("/author/:authorId", getPostsByAuthor);

export default router;
