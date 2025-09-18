import { Request, Response } from "express";
import * as orderService from "../services/order";
import { createCrudController } from "./crud.controller";
import { AuthenticatedRequest } from '../types/express/custom';
import { MailService } from "../services/mail.service";
import { getById } from "../services/customer";

    export const {
    getAll: getOrdersController,
    getById: getOrderByIdController,
    create: saveOrderController,
    remove: deleteOrderController
    } = createCrudController(orderService);

    export const updateOrderController = async(req: AuthenticatedRequest, res: Response) => {
        try {
            const { id } = req.params;
            const idNumber = parseInt(id);
            const existingOrder = await orderService.getById(idNumber);
            const mailService = new MailService();

            if (!existingOrder) {
                res.status(404).json({
                    success: false,
                    message: 'Order no encontrada'
                })
                return;
            }

            const orderData = {
                ord_status : req.body.ord_status,
                ord_customer: req.body.ord_customer,
                ord_date: req.body.ord_date
            }

            const responseOrder = await orderService.update(orderData, idNumber);

            if (responseOrder === null ) {
            res.status(404).json({success: false ,message: "No se encontro la orden", data: responseOrder });
            return
            }

            if (orderData.ord_status === 'COMPLETED') {

                const infoUser = await getById(req.body.ord_customer)
                if (!infoUser) { return}


            await mailService.sendReviewRequest(infoUser.cx_email, idNumber);
            }

            res.status(200).json({
            success: true,
            message: "Orden actualizado exitosamente",

            })
        } catch (e) {
            console.log(e)
            res.status(404).json({
            success: false,
            message: "No se encontró la order con ese ID"
        })

        }
    }

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

