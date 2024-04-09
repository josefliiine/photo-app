import express from "express";
import { index, show, store, update, addPhoto } from "../controllers/albums_controller";
import { createAlbumRules, updateAlbumRules } from "../validations/albums_rules";
const router = express.Router();
import { basic } from "../middlewares/auth/basic"

// Get all albums
router.get("/", basic, index);

// Get a single album
router.get("/:albumId", basic, show);

// Create a album
router.post("/", createAlbumRules, basic, store);

// Update a album
router.patch("/:albumId", updateAlbumRules, basic, update);

// Add a photo to an album
router.post("/:albumId/photos", basic, addPhoto);

export default router;
