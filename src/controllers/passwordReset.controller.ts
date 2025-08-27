import { Request, Response } from "express";
import  {PasswordResetService} from "../services/passwordReset.service"


    const requestResetController = async(req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.body;
            const { token, expiresAt} = await PasswordResetService.createResetToken(email)

            // Aquí deberías mandar el correo real, pero devolvemos para pruebas
            res.json({ message: "Token generado", token, expiresAt });
            return 
        } catch (error:any){
            res.status(400).json({error:error.message});
            return 
        }
    
    }
    const confirmResetController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token, newPassword } = req.body;
        const result = await PasswordResetService.resetPassword(token, newPassword);
        res.json(result);
        return 
    } catch (error: any) {
        res.status(400).json({ error: error.message });
        return 
    }
    }

    export {requestResetController, confirmResetController}