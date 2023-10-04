import express from "express";
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/bookcontroler.js";

const router = express.Router();

// Ruta para agregar un nuevo libro
router.post("/", createBook);

// Ruta para obtener todos los libros
router.get("/", getBooks);

// Ruta para obtener un libro por ID
router.get("/:id", getBook);

// Ruta para actualizar un libro por ID
router.put("/:id", updateBook);

// Ruta para eliminar un libro por ID
router.delete("/:id", deleteBook);

export default router;
