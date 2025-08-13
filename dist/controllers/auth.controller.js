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
exports.AuthController = void 0;
const conexion_1 = require("../config/conexion");
const customer_entity_1 = require("../entities/customer.entity");
const jwt = __importStar(require("jsonwebtoken"));
// Verifica que JWT_SECRET esté definido
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
}
const JWT_SECRET_KEY = JWT_SECRET;
class AuthController {
    constructor() {
        this.userRepository = conexion_1.AppDataSource.getRepository(customer_entity_1.CustomerEntity);
        this.register = async (req, res) => {
            try {
                const { cx_first_name, cx_last_name, cx_phone, cx_address, cx_city, cx_postal_code, cx_email, cx_password } = req.body;
                // verificar que existe el usuario
                const existingUser = await this.userRepository.findOne({ where: { cx_email } });
                if (existingUser) {
                    res.status(400).json({ message: "El usuario ya existio" });
                }
                // crear nuevo Usuario
                const user = new customer_entity_1.CustomerEntity;
                user.cx_first_name = cx_first_name,
                    user.cx_last_name = cx_last_name,
                    user.cx_phone = cx_phone;
                user.cx_address = cx_address;
                user.cx_city = cx_city;
                user.cx_postal_code = cx_postal_code;
                user.cx_email = cx_email;
                user.cx_password = cx_password;
                await user.hashPassword();
                //guardar usuario en la base de datos
                await this.userRepository.save(user);
                //generar token JWT
                const token = jwt.sign({ userId: user.cx_id, cx_email: user.cx_email }, JWT_SECRET_KEY, { expiresIn: "1h" });
                // creacion de los datos de user 
                const dataUser = {
                    id_user: user.cx_id,
                    first_name: user.cx_first_name,
                    last_name: user.cx_last_name,
                    phone: user.cx_phone,
                    address: user.cx_address,
                    city: user.cx_city,
                    postal_code: user.cx_postal_code,
                    email: user.cx_email,
                };
                res.status(201).json({
                    dataUser: dataUser,
                    token,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error al registrar usuario" });
            }
        };
        this.login = async (req, res) => {
            try {
                const { cx_email, cx_password } = req.body;
                // Verificar usuario
                const user = await this.userRepository.findOne({ where: { cx_email } });
                if (!user) {
                    res.status(401).json({ message: "Credenciales inválidas" });
                    return;
                }
                // Verificar contraseña
                const isMatch = await user.comparePassword(cx_password);
                if (!isMatch) {
                    res.status(401).json({ message: "Credenciales inválidas" });
                    return;
                }
                // Generar token JWT
                const token = jwt.sign({ userId: user.cx_id, email: user.cx_email }, JWT_SECRET_KEY, { expiresIn: "1h" });
                // creacion de los datos de user 
                // const dataUser = {
                //   id_user: user.cx_id,
                //   first_name: user.cx_first_name,
                //   last_name:  user.cx_last_name,
                //   phone: user.cx_phone,
                //   address: user.cx_address,
                //   city:user.cx_city,  
                //   postal_code: user.cx_postal_code,
                //   email: user.cx_email,
                // }
                // Enviar respuesta de datos de usuario y token pero por cookies
                res.cookie('token', token, {
                    httpOnly: true, // Evita acceso desde JavaScript
                    secure: process.env.NODE_ENV === 'production', // Solo enviar por HTTPS en producciónsa
                    sameSite: 'lax', // Evita envío en solicitudes de terceros
                    maxAge: 60 * 60 * 1000 // 1 hora en milisegundos
                })
                    .status(200)
                    .json({ message: "Login exitoso" });
                // Enviar respuesta de datos de usuario y token pero para localStorage
                // res.status(200).json({
                //   dataUser: dataUser,
                //   token,
                // });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error al iniciar sesión" });
            }
        };
    }
}
exports.AuthController = AuthController;
