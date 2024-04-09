import express from "express";
import { getProfile, getPhotos, getAlbums, addAlbums, addPhotos } from "../controllers/profile_controller";
const router = express.Router();
import { basic } from "../middlewares/auth/basic"

// Get a single user
router.get("/", basic, getProfile);

// GET /profile/photos

router.get("/photos", basic, getPhotos);

// Link photos, /profile/photos, to the authenticated user

router.post("/photos", basic, addPhotos);

// GET /profile/albums

router.get("/albums", basic, getAlbums);

// Link albums, /profile/albums, to the authenticated user

router.post("/albums", basic, addAlbums);

export default router;
