"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const Order_1 = require("../controllers/Order");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/allday", Order_1.getAllOrderByDays); // para admin
router.get("/all/:id", Order_1.getAllOrderById); // para admin
router.get("/all", Order_1.getAllOrderAndCustomer);
router.get("/full", auth_middleware_1.authMiddleware, Order_1.getProductByOrderByIdController); //: el id del usuaeio ya viene en el token
router.get("/", Order_1.getOrdersController);
router.get("/:id", Order_1.getOrderByIdController);
router.post("/", Order_1.saveOrderController);
router.put("/:id", Order_1.updateOrderController);
router.delete("/:id", Order_1.deleteOrderController);
