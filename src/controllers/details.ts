import * as detailsService from "../services/detail";
import { createCrudController } from "./crud.controller";

export const {
    getAll: getDetailsController,
    getById: getDetailByIdController,
    create: saveDetailController,    
    update: updateDetailController,
    remove: deleteDetailController
} = createCrudController(detailsService);
