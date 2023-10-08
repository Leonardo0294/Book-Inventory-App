import express from "express";
import { Router } from "express";

import {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
  /* renderAuthor, */
} from "../controllers/authorController.js";

const router = express.Router();
// Ruta para mostrar la lista de autores

// Ruta para mostrar la lista de autores
/* router.get("/", renderAuthor); */
// Ruta para agregar un nuevo autor
router.post("/authors", createAuthor); // Corregir la ruta

// Ruta para obtener todos los autores
router.get("/authors", getAuthors);

// Ruta para obtener un autor por ID
router.get("/authors/:id", getAuthor); // Corregir la ruta

// Ruta para actualizar un autor por ID
router.put("/authors/:id", updateAuthor); // Corregir la ruta

// Ruta para eliminar un autor por ID
router.delete("/authors/:id", deleteAuthor); // Corregir la ruta

export default router;
