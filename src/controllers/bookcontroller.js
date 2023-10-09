import Book from "../models/books.js";
import path from "path";
import upload from "../uploads/multer.js";

export async function createBook(req, res) {
  try {
    const { title, genre, year, author } = req.body;
    const newBook = new Book({ title, genre, year, author });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el libro" });
  }
}

// Función para obtener todos los libros
export async function getBooks(req, res) {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los libros" });
  }
}

// Función para obtener un libro por ID
export async function getBook(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el libro" });
  }
}

// Función para actualizar un libro por ID
export async function updateBook(req, res) {
  try {
    const { title, genre, year, author } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, genre, year, author },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el libro" });
  }
}

// Función para eliminar un libro por ID
export async function deleteBook(req, res) {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.status(200).json({ message: "Libro eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
}

// Función para cargar una imagen de portada de libro
export async function uploadCoverImage(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No se ha cargado ninguna imagen." });
    }

    // Aquí puedes realizar cualquier acción adicional, como guardar la imagen en tu servidor o procesarla de otra manera.
const baseUrl = "http://tu-sitio-web.com/uploads/";
    // Crea un nuevo libro con la URL de la imagen de portada
    const newBook = new Book({
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year,
      author: req.body.author,
      coverImage: baseUrl + req.file.filename,
    });

    // Guarda el nuevo libro en la base de datos
    const savedBook = await newBook.save();

    res
      .status(201)
      .json({ message: "Libro creado con éxito.", book: savedBook });
  } catch (error) {
    console.error(error);
    res.status(201).json({ imagen: "Se ha cargado la imagen con exito" });
  }


  
}
