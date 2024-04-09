import express from "express";
import { register } from "../controllers/register_controller";
const router = express.Router();

// Register a user
router.post('/register', register);

export default router;
