import { Request, Response } from "express";
import * as orderService from "../services/order";
import { createCrudController } from "./crud.controller";

export const {
    getAll: getOrdersController,
    getById: getOrderByIdController,
    create: saveOrderController,    
    update: updateOrderController,
    remove: deleteOrderController
} = createCrudController(orderService);

export const getProductByOrderByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const idNumber = parseInt(id);
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