import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import path from "path";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./src/database/database.js";
import upload from "./src/uploads/multer.js"; // Importa la configuración de Multer
import authorsRouter from "./src/routes/author.routes.js";
import booksRouter from "./src/routes/books.routes.js";

dotenv.config({ path: ".env" });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));

// Configura la conexión a la base de datos MongoDB
connectDB();

// Configura el motor de vista EJS y la carpeta de vistas
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

// Configura middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura la carpeta estática para servir archivos públicos
app.use(express.static(path.join(process.cwd(), "public")));

// Configura las rutas
app.use("/api/", authorsRouter); // Rutas de autores bajo /api/authors
app.use("/api/", booksRouter); // Rutas de libros bajo /api/books

// Middleware para cargar imágenes con Multer
app.use(fileUpload());

// Ruta para cargar una imagen (ejemplo)
app.post("/upload", upload.single("coverImage"), (req, res) => {
  // Accede al archivo cargado desde req.files.coverImage
  if (!req.files || !req.files.coverImage) {
    return res.status(400).json({ error: "No se ha cargado ninguna imagen." });
  }

  // Puedes realizar acciones adicionales aquí, como guardar la imagen en la base de datos
  // o moverla a una ubicación específica en tu servidor

  res.status(200).json({ message: "Imagen cargada exitosamente." });
});

/* // Ruta para renderizar la vista de autores
app.get("/authors", (req, res) => {
  res.render("authors");
});

// Ruta para renderizar la vista de libros
app.get("/books", (req, res) => {
  res.render("books");
}); */

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
