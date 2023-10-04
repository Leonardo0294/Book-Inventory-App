import express from "express";
import {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorcontroller.js";

const router = express.Router();

// Ruta para agregar un nuevo autor
router.post("/", createAuthor);

// Ruta para obtener todos los autores
router.get("/", getAuthors);

// Ruta para obtener un autor por ID
router.get("/:id", getAuthor);

// Ruta para actualizar un autor por ID
router.put("/:id", updateAuthor);

// Ruta para eliminar un autor por ID
router.delete("/:id", deleteAuthor);

export default router;
