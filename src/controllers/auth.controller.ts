import { Request, Response } from "express";
import { AppDataSource } from "../config/conexion";
import { CustomerEntity } from "../entities/customer.entity";
import * as jwt from "jsonwebtoken";

// Verifica que JWT_SECRET esté definido
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

const JWT_SECRET_KEY = JWT_SECRET as string;

export class AuthController {
    private userRepository = AppDataSource.getRepository(CustomerEntity);

    register = async(req: Request, res: Response) : Promise<void> => {
        try{
            const {cx_first_name, cx_last_name,cx_phone,cx_address,cx_city,cx_postal_code, cx_email, cx_password } = req.body;

            // verificar que existe el usuario
            const existingUser = await this.userRepository.findOne({where : { cx_email }})
            if (existingUser){
                res.status(400).json({message: "El usuario ya existio"});
            }
            
            // crear nuevo Usuario
            const user = new CustomerEntity;
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
            const token = jwt.sign(
                {userId: user.cx_id, cx_email:user.cx_email},
                JWT_SECRET_KEY,
                {expiresIn: "1h"}
            );

            res.status(201).json({
                userId: user.cx_id,
                email: user.cx_email,
                token,
            })

        }  catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al registrar usuario" });
        }
    }
    
    login = async(req: Request, res: Response) : Promise<void>  => {
    try {
      const {cx_email, cx_password } = req.body;

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
      }

      // Generar token JWT
      const token = jwt.sign(
        { userId: user.cx_id, email: user.cx_email },
        JWT_SECRET_KEY ,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        userId: user.cx_id,
        email: user.cx_email,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al iniciar sesión" });
    }
  }
}