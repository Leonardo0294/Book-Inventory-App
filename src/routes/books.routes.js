import express from "express";
import { Router } from "express";
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  uploadCoverImage,
} from "../controllers/bookController.js";
import upload from "../uploads/multer.js";

const router = express.Router();

// Ruta para agregar un nuevo libro (POST) con Multer
router.post("/", upload.single("coverImage"), createBook);

// Ruta para obtener todos los libros (GET)
router.get("/", getBooks);

// Ruta para obtener un libro por ID (GET)
router.get("/:id", getBook);

// Ruta para actualizar un libro por ID (PUT)
router.put("/:id", upload.single("coverImage"), updateBook);

// Ruta para eliminar un libro por ID (DELETE)
router.delete("/:id", deleteBook);

// Ruta para cargar una imagen de portada de libro (POST)
router.post("/upload-cover", upload.single("coverImage"), uploadCoverImage);

export default router;
