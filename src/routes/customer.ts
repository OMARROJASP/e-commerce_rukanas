import { Router } from "express";
import {
    getCustomersController,
    getCustomerByIdController,
    saveCustomerController,
    updateCustomerController,
    deleteCustomerController,
} from "../controllers/customer"

const router = Router();



router.get("/", getCustomersController);
router.get("/:id", getCustomerByIdController);
router.post("/", saveCustomerController);
router.put("/:id", updateCustomerController);
router.delete("/:id", deleteCustomerController);

export { router}