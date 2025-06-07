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

        const idNumber = parseInt(user.cx_id.toString(), 10);
        const order = await orderService.getFullOrderByCustomerId(idNumber);
        if (!order) {
            res.status(404).json({ message: "No se encontro ordenes" });
            return 
        } 
        res.status(200).json({ message: "Cliente encontrado", data: order });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}