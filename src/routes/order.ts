import { Router } from "express";
import {
    getOrdersController,
    getOrderByIdController,
    saveOrderController,
    updateOrderController,
    deleteOrderController,
} from "../controllers/Order"

const router = Router();



router.get("/", getOrdersController);
router.get("/:id", getOrderByIdController);
router.post("/", saveOrderController);
router.put("/:id", updateOrderController);
router.delete("/:id", deleteOrderController);

export { router}