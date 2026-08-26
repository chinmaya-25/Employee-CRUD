import { Router } from "express";

import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeStatus,
  getStats,
} from "../controllers/employeeController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", authenticate, authorize("ADMIN", "MANAGER"), getEmployees);
router.post("/", authenticate, authorize("ADMIN"), createEmployee);
router.get("/stats", getStats);
router.get("/:id", authenticate, getEmployeeById);
router.put("/:id", authenticate, authorize("ADMIN", "MANAGER"), updateEmployee);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteEmployee);
router.patch("/:id/status", toggleEmployeeStatus);

export default router;
