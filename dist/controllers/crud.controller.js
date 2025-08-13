"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrudController = createCrudController;
const error_handler_1 = require("../utils/error.handler");
function createCrudController(service) {
    return {
        getAll: async (req, res) => {
            try {
                const data = await service.getAll();
                res.send({ message: "GET_ALL", data: data });
            }
            catch (e) {
                (0, error_handler_1.handleHttp)(res, "ERROR_GET_ALL");
            }
        },
        getById: async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const data = await service.getById(id);
                res.send({ message: "GET_BY_ID", data: data || "No se encontró" });
            }
            catch (e) {
                console.log(e);
                (0, error_handler_1.handleHttp)(res, "ERROR_GET_BY_ID");
            }
        },
        create: async (req, res) => {
            try {
                const data = await service.create(req.body);
                res.send({ message: "CREATED", data: data });
            }
            catch (e) {
                console.log(e);
                (0, error_handler_1.handleHttp)(res, "ERROR_CREATE");
            }
        },
        update: async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const data = await service.update(req.body, id);
                res.send({ message: "UPDATED", data: data });
            }
            catch (e) {
                (0, error_handler_1.handleHttp)(res, "ERROR_UPDATE");
            }
        },
        remove: async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const data = await service.remove(id);
                res.send({ message: "DELETED", data: data });
            }
            catch (e) {
                (0, error_handler_1.handleHttp)(res, "ERROR_DELETE");
            }
        }
    };
}
