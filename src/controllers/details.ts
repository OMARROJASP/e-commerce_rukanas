import { Request, Response } from "express";
import * as detailsService from "../services/detail";
import { createCrudController } from "./crud.controller";

export const {
    getAll: getDetailsController,
    getById: getDetailByIdController,
    create: saveDetailController,    
    update: updateDetailController,
    remove: deleteDetailController
} = createCrudController(detailsService);


// Para la plataforma de Admin
export const getAllOrderByOrder = async(req: Request, res:Response) => {

    const id  = parseInt(req.params.id); 

    try {
        const response =  await detailsService.getAllByOrder(id);
        
        res.status(200).json({message: 'Se optuvo información de detalles', data: response})

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" });
    }

}