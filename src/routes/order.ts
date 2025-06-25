import { Router } from "express";
import { authMiddleware } from '../middlewares/auth.middleware';
import {
    getOrdersController,
    getOrderByIdController,
    saveOrderController,
    updateOrderController,
    deleteOrderController,
    getProductByOrderByIdController,
    getAllOrderAndCustomer,
    getAllOrderById,
    getAllOrderByDays

} from "../controllers/Order"

const router = Router();
router.get("/all/:id",getAllOrderById) // para admin
router.get("/all-day",getAllOrderByDays) // para admin
router.get("/all",getAllOrderAndCustomer)
router.get("/full",authMiddleware, getProductByOrderByIdController); //: el id del usuaeio ya viene en el token
router.get("/", getOrdersController);
router.get("/:id", getOrderByIdController);
router.post("/", saveOrderController);
router.put("/:id", updateOrderController);
router.delete("/:id", deleteOrderController);

export { router}