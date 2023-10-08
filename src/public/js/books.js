import express from "express";
import Book from "../models/book.js";

const router = express.Router();

// Ruta para mostrar la lista de libros
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find().populate("author"); // Usamos populate para obtener los datos del autor
    res.render("book-list", { books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la lista de libros" });
  }
});

// Otras rutas y controladores para libros...

export default router;
