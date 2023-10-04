import Book from "../models/books.js";

// Controlador para agregar un nuevo libro
export const createBook = async (req, res) => {
  try {
    const { title, genre, year, authorId } = req.body;
    const coverImage = req.files.coverImage.name; // Obtener el nombre de la imagen
    const newBook = new Book({
      title,
      genre,
      year,
      author: authorId,
      coverImage,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el libro" });
  }
};

// Controlador para obtener todos los libros
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

// Controlador para obtener un libro por ID
export const getBook = async (req, res) => {
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
};

// Controlador para actualizar un libro por ID
export const updateBook = async (req, res) => {
  try {
    const { title, genre, year, authorId } = req.body;
    const coverImage = req.files.coverImage.name; // Obtener el nombre de la imagen
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, genre, year, author: authorId, coverImage },
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
};

// Controlador para eliminar un libro por ID
export const deleteBook = async (req, res) => {
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
};
