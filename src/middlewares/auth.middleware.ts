import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../config/conexion";
import { CustomerEntity } from "../entities/customer.entity";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };

    // Verificar que el usuario aún existe en la base de datos
    const userRepository = AppDataSource.getRepository(CustomerEntity);
    const user = await userRepository.findOne({ where: { cx_id: decoded.userId } });
    
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Agregar usuario al request
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Autenticación fallida" });
  }
};