import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/userController.js";

const router = Router();

// Crear usuario
router.post("/", createUser);
// Obtener todos los usuarios
router.get("/", getUsers);
// Actualizar usuario
router.put("/:id", updateUser);

// Eliminar usuario
router.delete("/:id", deleteUser);

export default router;
