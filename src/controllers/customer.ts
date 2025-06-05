import * as customerService from "../services/customer";
import { createCrudController } from "./crud.controller";
import { Request, Response } from 'express';
import { CustomerEntity } from '../entities/customer.entity';
import { AuthenticatedRequest } from '../types/express/custom';


export const {
    getAll: getCustomersController,
    getById: getCustomerByIdController, 
    create: saveCustomerController,
    update: updateCustomerController,
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



