import express from "express";
import { index, show, store, update } from "../controllers/photos_controller";
import { createPhotoRules, updatePhotoRules } from "../validations/photos_rules";
const router = express.Router();
import { basic } from "../middlewares/auth/basic"

// Get all photos
router.get("/", basic, index);

// Get a single photo
router.get("/:photoId", basic, show);

// Create a photo
router.post("/", createPhotoRules, basic, store);

// Update a photo
router.patch("/:photoId", updatePhotoRules, basic, update);

export default router;
