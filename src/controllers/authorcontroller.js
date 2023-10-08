import Author from "../models/author.js";
import path from "path";

// Controlador para mostrar la lista de autores

// Controlador para agregar un nuevo autor
export const createAuthor = async (req, res) => {
  try {
    const { firstName, lastName, biography } = req.body;
    const newAuthor = new Author({ firstName, lastName, biography });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding the author" });
  }
};

// Controlador para obtener todos los autores
export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting the authors" });
  }
};

// Controlador para obtener un autor por ID
export const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting the author" });
  }
};

// Controlador para actualizar un autor por ID
export const updateAuthor = async (req, res) => {
  try {
    const { firstName, lastName, biography } = req.body;
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, biography },
      { new: true }
    );
    if (!updatedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating the author" });
  }
};

// Controlador para eliminar un autor por ID
export const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndRemove(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting the author" });
  }
};
