import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../config/conexion";
import { CustomerEntity, CustomerRole } from "../entities/customer.entity";
import { AuthenticatedRequest } from "../types/express/custom";

// Verifica que JWT_SECRET esté definido
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

const JWT_SECRET_KEY = JWT_SECRET as string;

export const authMiddleware = async (
  req: Request,
  res: Response, 
  next: NextFunction
  ): Promise<void> => {
  // 1. Verificar cabecera de autorización SI utilizas cuando nos envian el token por authorization
  // const authHeader = req.headers.authorization;
  // if (!authHeader?.startsWith('Bearer ')){
  //   res.status(401).json({message: "Formato de token inválido. Use 'Bearer <Token>'"});
  //   return;
  // }

  // const token = authHeader.split(' ')[1];

// 1. Verificar cabecera de autorización cuando nos envia el token por cookie

  const token = req.cookies.token;
if (!token) {
  res.status(401).json({message: 'No autenticado'})
  return
}

  try{
    // 2. Verificar token JWT
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { userId: number };

    // 3. Verificar usuario en base de datos
    const userRepository = AppDataSource.getRepository(CustomerEntity);
    const user = await userRepository.findOne({
      where: { cx_id: decoded.userId },
      // select: ['cx_id', 'cx_email', 'role'] Puedes agregar los campos necesarios
    })

    if (!user) {
      res.status(401).json({message: "Usuario no encontrado"});
      return;
    }
    // 4. Adjuntar usuario al request (sin sobrescribir body)
    (req as Request & { user?: CustomerEntity }).user = user;
    next();
  }catch (error) {
    console.error('Error en autenticación:', error);
    
    const message = error instanceof jwt.TokenExpiredError
      ? "Token expirado"
      : error instanceof jwt.JsonWebTokenError
      ? "Token inválido"
      : "Error de autenticación";

     res.status(401).json({ message });
     return;
  }


}

// Middleware para roles
export const authorize = (...roles: CustomerRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    const userRole = req.user.cx_role as CustomerRole; // 👈 asegura tipo

    if (!roles.includes(userRole)) {
      res.status(403).json({ message: "No tienes permiso", role: userRole });
      return;
    }

    next();
  };
};
