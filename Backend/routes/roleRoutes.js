import { Router } from "express";

import { getRoles, createRole } from "../controllers/roleController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", authenticate, authorize("ADMIN"), getRoles);
router.post("/", authenticate, authorize("ADMIN"), createRole);

export default router;
