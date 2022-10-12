import { Router } from "express";
import {
	getUserDetails,
	loginUser,
	registerUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

/* SignUp Route */
const router = Router();
router.post("/register", registerUser);

/* Login route */
router.post("/login", loginUser);

/* Get Logged in User Details */
router.get("/me", isAuthenticated, getUserDetails);

export default router;
