import mongoose from "mongoose";

// CONEXION A BASE DE DATOS 
const connectDB = async () => {
  try {
    const uri = "mongodb://localhost:27017/modelado"; 
    await mongoose.connect(uri, {
      /* useNewUrlParser: true,
      useUnifiedTopology: true,
      
     
      useCreateIndexes: true, */
    });
    console.log("Conexión a MongoDB establecida");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};

export default connectDB;
