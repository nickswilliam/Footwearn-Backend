import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const dbURL = process.env.DB_URL;
    if (!dbURL) {
      throw new Error(
        "La URL de la base de datos no está correctamente definida, intente nuevamente"
      );
    }

    await mongoose.connect(dbURL);
    console.log('Conectado a la base de datos correctamente');
  } catch (error) {
        console.error(error)
        throw new Error('Error al conectarse a la base de datos')
  }
};
