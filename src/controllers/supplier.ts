import * as supplierService from "../services/supplier";
import { createCrudController } from "./crud.controller";

export const {
    getAll: getSuppliersController,
    getById: getSupplierByIdController,
    create: saveSupplierController,    
    update: updateSupplierController,
    remove: deleteSupplierController
} = createCrudController(supplierService);