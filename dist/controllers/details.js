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
exports.getAllOrderByOrder = exports.deleteDetailController = exports.updateDetailController = exports.saveDetailController = exports.getDetailByIdController = exports.getDetailsController = void 0;
const detailsService = __importStar(require("../services/detail"));
const crud_controller_1 = require("./crud.controller");
_a = (0, crud_controller_1.createCrudController)(detailsService), exports.getDetailsController = _a.getAll, exports.getDetailByIdController = _a.getById, exports.saveDetailController = _a.create, exports.updateDetailController = _a.update, exports.deleteDetailController = _a.remove;
// Para la plataforma de Admin
const getAllOrderByOrder = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const response = await detailsService.getAllByOrder(id);
        res.status(200).json({ message: 'Se optuvo información de detalles', data: response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.getAllOrderByOrder = getAllOrderByOrder;
