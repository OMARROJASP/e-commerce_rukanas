import "dotenv/config" 
import express, { Request, Response, NextFunction,ErrorRequestHandler  } from 'express';
import multer from 'multer';
import cors from 'cors';    
import cookieParser from "cookie-parser";
import { router} from './routes'
import authRoutes from "./routes/auth.routes"
import { AppDataSource } from './config/conexion'
const PORT = process.env.PORT || 3001;  

const app = express();
  // Middlewares
    app.use(express.json());
    app.use(cookieParser());
    
app.use(cors({
  origin: 'http://localhost:3000', // Cambia al dominio de Nuxt
  credentials: true
}));
app.use(express.json());  
app.use("/auth", authRoutes)  
app.use(router)
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Error específico de Multer
    res.status(400).json({ message: err.message });
  } else if (err) {
    // Otro tipo de error
    res.status(500).json({ message: "Error del servidor", error: err.message });
  } else {
    next();
  }
};

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conexión a la base de datos exitosa");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor listo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar la base de datos:", error);
  });


