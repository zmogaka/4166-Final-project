import express from "express";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/userController.js";
import { authenticate, isAdmin } from "../middleware/authenticate.js";
import { authorizeOwnership } from "../middleware/authorizeOwnership.js";
import { validateUser } from "../middleware/userValidators.js";

const router = express.Router();

router.get("/", authenticate, isAdmin, getAllUsersHandler);

router.get(
  "/profile/:id",
  authenticate,
  authorizeOwnership,
  getUserByIdHandler
);

router.put(
  "/profile/:id",
  authenticate,
  authorizeOwnership,
  validateUser,
  updateUserHandler
);

router.delete(
  "/profile/:id",
  authenticate,
  authorizeOwnership,
  deleteUserHandler
);

export default router;
