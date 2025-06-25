import { Request, Response } from "express";
import * as orderService from "../services/order";
import { createCrudController } from "./crud.controller";
import { AuthenticatedRequest } from '../types/express/custom';

export const {
    getAll: getOrdersController,
    getById: getOrderByIdController,
    create: saveOrderController,    
    update: updateOrderController,
    remove: deleteOrderController
} = createCrudController(orderService);

export const getProductByOrderByIdController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user =  req.user;
        if (!user) {
            res.status(401).json({ message: "No autenticado" });
            return;
        }

        const customerId  = parseInt(user.cx_id.toString(), 10);
        let order = await orderService.getFullOrderByCustomerId(customerId );
        if (!order) {
        // Crear una nueva orden si no existe una con status CREATED
        order = await orderService.create({
            ord_status: "CREATED",
            ord_customer: {
                cx_id: customerId
            }
        });

            res.status(200).json({ message: "Orden cargada correctamente", data: order });
            return 
        } 
        res.status(200).json({ message: "Cliente encontrado", data: order });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}


// Para la plataforma de Admin
export const getAllOrderAndCustomer = async (req: Request, res: Response) => {

    try {
        let orders = await orderService.getInfoOrderAndCustomerId();
        res.status(200).json({ message: "Orden cargada correctamente", data: orders });
        return 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getAllOrderById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        let orders = await orderService.getAllOrderByCustomerId(id);
        res.status(200).json({message: "Ordenes cargado correctamente", data: orders})
        return 
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getAllOrderByDays = async(req: Request, res: Response) => {
    try{
        let orders = await orderService.getOrderByDay();
        res.status(200).json({ message: "Las ordenes cargaron correctamente", data: orders })
        return
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
} 

