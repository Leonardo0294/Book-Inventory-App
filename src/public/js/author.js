import express from "express";
import Author from "";

const router = express.Router();

// Ruta para mostrar la lista de autores
router.get("/author", async (req, res) => {
  try {
    const author = await Author.find();
    res.render("author", { author });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la lista de autores" });
  }
});



export default router;
