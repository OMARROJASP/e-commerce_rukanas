import { Router } from "express";
import {
    getSuppliersController,
    getSupplierByIdController,
    saveSupplierController,
    updateSupplierController,
    deleteSupplierController,
} from "../controllers/supplier"

const router = Router();



router.get("/", getSuppliersController);
router.get("/:id", getSupplierByIdController);
router.post("/", saveSupplierController);
router.put("/:id", updateSupplierController);
router.delete("/:id", deleteSupplierController);

export { router}