"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrderByDays = exports.getAllOrderById = exports.getAllOrderAndCustomer = exports.getProductByOrderByIdController = exports.deleteOrderController = exports.updateOrderController = exports.saveOrderController = exports.getOrderByIdController = exports.getOrdersController = void 0;
const orderService = __importStar(require("../services/order"));
const crud_controller_1 = require("./crud.controller");
_a = (0, crud_controller_1.createCrudController)(orderService), exports.getOrdersController = _a.getAll, exports.getOrderByIdController = _a.getById, exports.saveOrderController = _a.create, exports.updateOrderController = _a.update, exports.deleteOrderController = _a.remove;
const getProductByOrderByIdController = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "No autenticado" });
            return;
        }
        const customerId = parseInt(user.cx_id.toString(), 10);
        let order = await orderService.getFullOrderByCustomerId(customerId);
        if (!order) {
            // Crear una nueva orden si no existe una con status CREATED
            order = await orderService.create({
                ord_status: "CREATED",
                ord_customer: {
                    cx_id: customerId
                }
            });
            res.status(200).json({ message: "Orden cargada correctamente", data: order });
            return;
        }
        res.status(200).json({ message: "Cliente encontrado", data: order });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.getProductByOrderByIdController = getProductByOrderByIdController;
// Para la plataforma de Admin
const getAllOrderAndCustomer = async (req, res) => {
    try {
        let orders = await orderService.getInfoOrderAndCustomerId();
        res.status(200).json({ message: "Orden cargada correctamente", data: orders });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.getAllOrderAndCustomer = getAllOrderAndCustomer;
const getAllOrderById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let orders = await orderService.getAllOrderByCustomerId(id);
        res.status(200).json({ message: "Ordenes cargado correctamente", data: orders });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.getAllOrderById = getAllOrderById;
const getAllOrderByDays = async (req, res) => {
    try {
        let orders = await orderService.getOrderByDay();
        res.status(200).json({ message: "Las ordenes cargaron correctamente", data: orders });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.getAllOrderByDays = getAllOrderByDays;
