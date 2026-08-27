import { Router } from "express";

import {
  login,
  currentUser,
  verifyMfaLogin,
  setupMfa,
  enableMfa,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/verify-mfa", verifyMfaLogin);
router.get("/me", authenticate, currentUser);
router.post("/mfa/setup", authenticate, setupMfa);
router.post("/mfa/enable", authenticate, enableMfa);

export default router;
