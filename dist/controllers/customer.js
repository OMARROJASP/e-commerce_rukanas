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
exports.getPerfilController = exports.deleteCustomerController = exports.updateCustomerController = exports.saveCustomerController = exports.getCustomerByIdController = exports.getCustomersController = void 0;
const customerService = __importStar(require("../services/customer"));
const crud_controller_1 = require("./crud.controller");
_a = (0, crud_controller_1.createCrudController)(customerService), exports.getCustomersController = _a.getAll, exports.getCustomerByIdController = _a.getById, exports.saveCustomerController = _a.create, exports.updateCustomerController = _a.update, exports.deleteCustomerController = _a.remove;
const getPerfilController = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "No autenticado" });
            return;
        }
        res.status(200).json({
            id: user.cx_id,
            first_name: user.cx_first_name,
            last_name: user.cx_last_name,
            email: user.cx_email,
            phone: user.cx_phone,
            address: user.cx_address,
            city: user.cx_city,
            postal_code: user.cx_postal_code,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el perfil" });
    }
};
exports.getPerfilController = getPerfilController;
