import * as customerService from "../services/customer";
import { createCrudController } from "./crud.controller";
import { NextFunction, Request, Response } from 'express';
import { CustomerEntity } from '../entities/customer.entity';
import { AuthenticatedRequest } from '../types/express/custom';
import { handleHttp } from "../utils/error.handler";

export const {
    getAll: getCustomersController,
    getById: getCustomerByIdController, 
    create: saveCustomerController,
    remove: deleteCustomerController
} = createCrudController(customerService);

export const getPerfilController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
try {
    const user = req.user;
     if (!user) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }
     res.status(200).json({
      id: user.cx_id,
      first_name: user.cx_first_name,
      last_name: user.cx_last_name,
      email: user.cx_email,
      phone: user.cx_phone,
      address: user.cx_address,
      city: user.cx_city,
      postal_code: user.cx_postal_code,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el perfil" });
  }
}

export const updateCustomerController = async (req:AuthenticatedRequest, res:Response,  next: NextFunction): Promise<void> => {


    try{
         // obtenemos el id de la categoria
         const user =  req.user;
         if (!user) {
            res.status(401).json({ message: "No autenticado" });
            return;
        }

        const idNumber = parseInt(user.cx_id.toString(), 10);
        // 1. Verificar si la categoría existe
        const existingCustomer = await customerService.getById(idNumber);
        if(!existingCustomer){
            res.status(404).json({
                message: "Customer no encontrada"
            });
            return;
        }
        
       // 4. Preparar datos para actualización
        const customerData = {
            cx_first_name: req.body.cx_first_name || existingCustomer.cx_first_name,
            cx_last_name: req.body.cx_last_name || existingCustomer.cx_last_name,
            cx_phone: req.body.cx_phone || existingCustomer.cx_phone,
            cx_address: req.body.cx_address || existingCustomer.cx_address,
            cx_city: req.body.cx_city || existingCustomer.cx_city,
            cx_postal_code:req.body.cx_postal_code || existingCustomer.cx_postal_code,
            cx_email: req.body.cx_email || existingCustomer.cx_email
        }; 

           // 5. Actualizar en base de datos
        const updatedCustomer = await customerService.update(customerData, idNumber);
        res.status(200).json({
            message: "Customer actualizada exitosamente",
            data: updatedCustomer,
        })
    }catch(e){
        console.error("Error al actualizar customer", e)
        handleHttp(res, "ERROR_GET_CUSTOMER")
    }
}


export const filterCustomersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    try {
        const{limit, page, text} = req.query;

        const customers = await customerService.getFilterCustomers(
            limit ? parseInt(limit as string): 10,
            page ? parseInt(page as string): 1,
            text as string
        );
        res.status(200).json({ success: true, data: customers });

    } catch (error) {
        res.status(500).json({ sucess: false, message: "Error interno del servidor" });
        handleHttp(res, "ERROR_FILTER_CUSTOMERS");
    }
}




