import express from "express";
import { signUpHandler } from "../controllers/authController.js";
import { validateUser } from "../middleware/userValidators.js";

const router = express.Router();

router.post("/signup", validateUser, signUpHandler);

export default router;
