import { Router } from "express";

import {
  getDepartments,
  createDepartment,
} from "../controllers/departmentController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", authenticate, authorize("ADMIN"), getDepartments);
router.post("/", authenticate, authorize("ADMIN"), createDepartment);

export default router;
