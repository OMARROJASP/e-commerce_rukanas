import { Router } from "express";
import {
    getOrdersController,
    getOrderByIdController,
    saveOrderController,
    updateOrderController,
    deleteOrderController,
    getProductByOrderByIdController
} from "../controllers/Order"

const router = Router();
router.get("/:id/full", getProductByOrderByIdController);
router.get("/", getOrdersController);
router.get("/:id", getOrderByIdController);
router.post("/", saveOrderController);
router.put("/:id", updateOrderController);
router.delete("/:id", deleteOrderController);

export { router}