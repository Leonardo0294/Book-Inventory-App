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
import authorsRouter from "./src/routes/author.routes.js";
import booksRouter from "./src/routes/books.routes.js";
import multer from "multer"; 
import Book from "./src/models/books.js";

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

// Configura Multer para manejar la carga de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware para cargar imágenes con Multer
app.use(upload.single("coverImage"));

// Resto del código de tu aplicación...

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
