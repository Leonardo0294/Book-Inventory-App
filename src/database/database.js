import { connect, set } from "mongoose";

// CONEXION A BASE DE DATOS
export const dbConection = async () => {
  try {
    set("strictQuery", true);
    await connect("mongodb://127.0.0.1:27017/modelado");
    console.log("database conection succsessfully");
  } catch (error) {
    console.log("error conecting to database", error);
  }
};

export default dbConection;
