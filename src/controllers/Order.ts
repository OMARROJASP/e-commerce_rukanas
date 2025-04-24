import * as orderService from "../services/order";
import { createCrudController } from "./crud.controller";

export const {
    getAll: getOrdersController,
    getById: getOrderByIdController,
    create: saveOrderController,    
    update: updateOrderController,
    remove: deleteOrderController
} = createCrudController(orderService);