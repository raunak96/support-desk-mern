import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";

/* SignUp Route */
const router = Router();
router.post("/register", registerUser);

/* Login route */
router.post("/login", loginUser);

export default router;
