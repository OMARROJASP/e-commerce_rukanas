import { Router } from "express";
import { authMiddleware } from '../middlewares/auth.middleware';

import {
    getCustomersController,
    getCustomerByIdController,
    saveCustomerController,
    updateCustomerController,
    deleteCustomerController,
    getPerfilController
} from "../controllers/customer"

const router = Router();
router.get("/perfil",authMiddleware, getPerfilController); // Ruta protegida


router.get("/", getCustomersController);
router.get("/:id", getCustomerByIdController); // Ruta protegida
router.post("/", saveCustomerController);
router.put("/:id", updateCustomerController);
router.delete("/:id", deleteCustomerController);

export { router}