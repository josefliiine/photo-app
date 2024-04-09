/**
 * Main application routes
 */
import express from "express";
const router = express.Router();
import albumRoutes from "./albums";
import photoRoutes from "./photos";
import registerRoutes from "./register";
import userRoutes from "./profile";
import { createUserRules } from "../validations/register_rules";
import { basic } from "../middlewares/auth/basic";

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "But first, let me take a selfie 🤳 https://www.youtube.com/watch?v=kdemFfbS5H0",
	});
});

// Albums
router.use("/albums", albumRoutes);

// Photos
router.use("/photos", photoRoutes);

// Register
router.post("/register", createUserRules, registerRoutes);

// Profile
router.use("/profile", basic, userRoutes);

/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: "Not Found",
	});
});

export default router;
