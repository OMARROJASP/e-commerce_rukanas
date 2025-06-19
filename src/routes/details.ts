import { Router } from "express";
import {
    getDetailsController,
    getDetailByIdController,
    saveDetailController,
    updateDetailController,
    deleteDetailController,
    getAllOrderByOrder
} from "../controllers/details"

const router = Router();


router.get("/admin/full/:id", getAllOrderByOrder)
router.get("/", getDetailsController);
router.get("/:id", getDetailByIdController);
router.post("/", saveDetailController);
router.put("/:id", updateDetailController);
router.delete("/:id", deleteDetailController);

export { router}