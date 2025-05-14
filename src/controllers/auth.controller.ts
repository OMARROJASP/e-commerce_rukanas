import { Request, Response } from "express";
import { AppDataSource } from "../config/conexion";
import { CustomerEntity } from "../entities/customer.entity";
import * as jwt from "jsonwebtoken";

export class AuthController {
    private userRepository = AppDataSource.getRepository(CustomerEntity);

    async register(req: Request, res: Response){
        try{
            const { cx_email, cx_password } = req.body;

            // verificar que existe el usuario
            const existingUser = await this.userRepository.findOne({where : { cx_email }})
            if (existingUser){
                return res.status(400).json({message: "El usuario ya existio"});
            }

            // crear nuevo Usuario
            const user = new CustomerEntity;
            user.cx_email = cx_email;
            user.cx_password = cx_password;
            await user.hashPassword();

            //guardar usuario en la base de datos
            await this.userRepository.save(user);

            //generar token JWT
            const token = jwt.sign(
                {userId: user.cx_id, cx_email:user.cx_email},
                process.env.JWT_SECRET,
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
    
    async login(req: Request, res: Response) {
    try {
      const {cx_email, cx_password } = req.body;

      // Verificar usuario
      const user = await this.userRepository.findOne({ where: { cx_email } });
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      // Verificar contraseña
      const isMatch = await user.comparePassword(cx_password);
      if (!isMatch) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      // Generar token JWT
      const token = jwt.sign(
        { userId: user.cx_id, email: user.cx_email },
        process.env.JWT_SECRET,
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