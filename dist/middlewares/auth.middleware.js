"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const conexion_1 = require("../config/conexion");
const customer_entity_1 = require("../entities/customer.entity");
// Verifica que JWT_SECRET esté definido
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
}
const JWT_SECRET_KEY = JWT_SECRET;
const authMiddleware = async (req, res, next) => {
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
        res.status(401).json({ message: 'No autenticado' });
        return;
    }
    try {
        // 2. Verificar token JWT
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        // 3. Verificar usuario en base de datos
        const userRepository = conexion_1.AppDataSource.getRepository(customer_entity_1.CustomerEntity);
        const user = await userRepository.findOne({
            where: { cx_id: decoded.userId },
            // select: ['cx_id', 'cx_email', 'role'] Puedes agregar los campos necesarios
        });
        if (!user) {
            res.status(401).json({ message: "Usuario no encontrado" });
            return;
        }
        // 4. Adjuntar usuario al request (sin sobrescribir body)
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Error en autenticación:', error);
        const message = error instanceof jwt.TokenExpiredError
            ? "Token expirado"
            : error instanceof jwt.JsonWebTokenError
                ? "Token inválido"
                : "Error de autenticación";
        res.status(401).json({ message });
        return;
    }
};
exports.authMiddleware = authMiddleware;
