import { Router } from "express";
import { authMiddleware, authorize } from '../middlewares/auth.middleware';

import {
    getCustomersController,
    getCustomerByIdController,
    saveCustomerController,
    updateCustomerController,
    deleteCustomerController,
    getPerfilController,
    filterCustomersController
} from "../controllers/customer"
import { CustomerRole } from "../entities/customer.entity";

const router = Router();
router.get("/perfil",authMiddleware, getPerfilController); // Ruta protegida
router.put("/edit", authMiddleware, updateCustomerController);
router.get("/filter", filterCustomersController); // Ruta protegida
//router.get("/filter", authorize(CustomerRole.ADMIN) ,filterCustomersController); // Ruta protegida

router.get("/", getCustomersController);
router.get("/:id", getCustomerByIdController); // Ruta protegida
router.post("/", saveCustomerController);

router.delete("/:id", deleteCustomerController);

export { router}