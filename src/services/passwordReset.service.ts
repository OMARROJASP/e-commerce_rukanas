import { AppDataSource } from "../config/conexion";
import { CustomerEntity } from "../entities/customer.entity"; 
import { PasswordResetToken } from "../entities/PasswordResetToken ";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const customersRepository = AppDataSource.getRepository(CustomerEntity);
const tokenRepo = AppDataSource.getRepository(PasswordResetToken);

export class PasswordResetService {
    static async createResetToken(email: string) {
        const customer = await customersRepository.findOne({ where: { cx_email:email } });
        if (!customer) throw new Error("Usuario no encontrado");

        const token = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 15);
        
        const resetToken = tokenRepo.create({
            token,
            expiresAt,
            customer
        });

        await tokenRepo.save(resetToken);
        return {token, expiresAt};
    }

    static async resetPassword(token:string, newPassword: string) {
        const resetToken = await tokenRepo.findOne({
            where: {token},
            relations: ["customer"]
        });

        if (!resetToken) throw new Error("Token inválido");
        if (resetToken.expiresAt < new Date()) {
            throw new Error("Token expirado");
        }

        resetToken.customer.cx_password = await bcrypt.hash(newPassword, 10);
        await customersRepository.save(resetToken.customer);

        await tokenRepo.delete(resetToken.id);

        return {message: "contraseña actualizada correctamente"}
    }

    
}

//  ord_customer: { cx_id: customerId },