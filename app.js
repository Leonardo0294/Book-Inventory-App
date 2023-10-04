import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import path from "path";
import connectDB from "./src/database/database.js";

const app = express();

// Configura la conexión a la base de datos MongoDB
connectDB();

// Configura middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());








/* app.use(express.static(path.join(__dirname, "public")));
 */
// Define las rutas
import authorsRouter from "./src/routes/author.routes.js";
import booksRouter from "./src/routes/books.routes.js"; // Cambiado a "book.routes.js"

app.use("/authors", authorsRouter);
app.use("/books", booksRouter);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
