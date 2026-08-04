import express from "express";
import * as adminUserController from "../controllers/adminUser.controller.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

router.get("/", adminUserController.listUsers);
router.get("/:id", adminUserController.getUserById);
router.delete("/:id", adminUserController.deleteUserById);
router.patch(
  "/:id/role",
  requireRole(["SUPERUSER"]),
  adminUserController.updateUserRole,
);

export default router;
