import * as customerService from "../services/customer";
import { createCrudController } from "./crud.controller";


export const {
    getAll: getCustomersController,
    getById: getCustomerByIdController, 
    create: saveCustomerController,
    update: updateCustomerController,
    remove: deleteCustomerController
} = createCrudController(customerService);