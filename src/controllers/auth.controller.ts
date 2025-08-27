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

            // creacion de los datos de user 
      const dataUser = {
        id_user: user.cx_id,
        first_name: user.cx_first_name,
        last_name:  user.cx_last_name,
        phone: user.cx_phone,
        address: user.cx_address,
        city:user.cx_city,
        postal_code: user.cx_postal_code,
        email: user.cx_email,
      }

            res.status(201).json({
              dataUser: dataUser,
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
        res.status(401).json({ success: false, message: "Credenciales inválidas" });
        return;
      }

      // Verificar contraseña
      const isMatch = await user.comparePassword(cx_password);
      if (!isMatch) {
        res.status(401).json({ success: false, message: "Credenciales inválidas" });
        return;
      }

      // Generar token JWT
      const token = jwt.sign(
        { userId: user.cx_id, email: user.cx_email },
        JWT_SECRET_KEY ,
        { expiresIn: "1h" }
      );

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
        maxAge: 60*60*1000 // 1 hora en milisegundos
      })
      .status(200)
      .json({success: true, message: "Login exitoso" });


      // Enviar respuesta de datos de usuario y token pero para localStorage
      // res.status(200).json({
      //   dataUser: dataUser,
      //   token,
      // });
    } catch (error) {
      console.error(error);
      res.status(500).json({success: false, message: "Error al iniciar sesión" });
    }
  }

  logOut = async(req:Request, res:Response) : Promise<void> => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      })
    .status(200)
    .json({ success: true, message: "Sesión cerrada correctamente" });
  } 
}