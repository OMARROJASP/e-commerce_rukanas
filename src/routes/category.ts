import { Router } from "express";
import { getCategoriesController } from "../controllers/category";

const router = Router();

router.get("/", getCategoriesController) 

export { router}