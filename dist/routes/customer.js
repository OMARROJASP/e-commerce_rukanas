"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const customer_1 = require("../controllers/customer");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/perfil", auth_middleware_1.authMiddleware, customer_1.getPerfilController); // Ruta protegida
router.get("/", customer_1.getCustomersController);
router.get("/:id", customer_1.getCustomerByIdController); // Ruta protegida
router.post("/", customer_1.saveCustomerController);
router.put("/:id", customer_1.updateCustomerController);
router.delete("/:id", customer_1.deleteCustomerController);
