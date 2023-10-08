import multer from "multer";

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directorio de destino para guardar las imágenes
  },
  filename: (req, file, cb) => {
    // Personaliza el nombre del archivo si lo deseas, por ejemplo, usando un timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Crea una instancia de Multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

export default upload;
