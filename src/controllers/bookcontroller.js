import Book from "../models/books.js";
import path from "path";

// Controlador para mostrar la lista de libros

// Controlador para agregar un nuevo libro
export const createBook = async (req, res) => {
  try {
    const { title, genre, year, authorId } = req.body;

    // Verifica si se cargó una imagen
    if (!req.file) {
      return res.status(400).json({ error: "Debes cargar una imagen" });
    }

    const coverImage = req.file.filename;

    const newBook = new Book({
      title,
      genre,
      year,
      author: authorId,
      coverImage,
    });

    await newBook.save();

    res.redirect("/books"); // Redirige a la vista de libros
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding the book" });
  }
};

// Controlador para obtener todos los libros
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting the books" });
  }
};

// Controlador para obtener un libro por ID
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting the book" });
  }
};

// Controlador para actualizar un libro por ID
export const updateBook = async (req, res) => {
  try {
    const { title, genre, year, authorId } = req.body;

    // Verifica si se cargó una imagen
    if (!req.file) {
      return res.status(400).json({ error: "Debes cargar una imagen" });
    }

    const coverImage = req.file.filename;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, genre, year, author: authorId, coverImage },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating the book" });
  }
};

// Controlador para eliminar un libro por ID
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting the book" });
  }
};
