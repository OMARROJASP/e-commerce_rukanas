import { Router } from "express";
import { requestResetController, confirmResetController } from "../controllers/passwordReset.controller";

const router = Router();

router.post("/password-reset/request", requestResetController);
router.post("/password-reset/confirm", confirmResetController);

export { router  };  
