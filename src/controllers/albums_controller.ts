import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { createAlbum, getAlbums, getAlbum, updateAlbum, addPhotoToAlbum } from "../services/albums_service";
import { CreateAlbum, UpdateAlbum } from "../types/albums_types";
import { Album, Photo } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { getUserById } from "../services/register_service";
import { getPhoto } from "../services/photos_service";

const prisma = new PrismaClient();

const debug = Debug("fed23-api-uppgift-1-josefliiine:album_controller");

// Get all albums
export const index = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        const userId = req.user.id;

        const albums = await getAlbums(userId);

        res.send({ status: "success", data: albums });
    } catch (error) {
        console.error("Error when trying to find user's albums", error);
        res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
    }
};

// Get a single album
export const show = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId);

    try {
        if (!req.user) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        const userId = req.user.id;

        const album = await getAlbum(albumId);

        if (!album) {
            return res.status(404).send({ status: "fail", message: "Album not found" });
        }

        if (album.userId !== userId) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        res.send({ status: "success", data: album });

    } catch (error: any) {
        debug("Error when trying to query for album with ID %d: %O", albumId, error);
        res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
    }
};

// Create a new album
export const store = async (req: Request, res: Response) => {
    const validatedData = matchedData(req) as CreateAlbum;

    if (!req.user) {
        return res.status(401).send({ status: "fail", message: "Unauthorized" });
    }

	const validationErrors = validationResult(req);

	// If validation errors, respond with errors and stop request ✋🏻
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
	});
		return;
	}


    try {
        const userId = req.user.id;
        validatedData.userId = userId;

        const album = await createAlbum(validatedData, userId);

        const response: { status: string; data: Album } = {
            status: "success",
            data: {
                id: album.id,
                title: album.title,
                userId: album.userId,
            },
        };

        res.status(201).send(response);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ status: "error", message: "Something went wrong when creating this in the database" });
    }
};

// Update a album
export const update = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId);

	const validationErrors = validationResult(req);

	// If validation errors, respond with errors and stop request ✋🏻
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
	});
		return;
	}

    const validatedData = matchedData(req) as UpdateAlbum;

    try {
        if (!req.user) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        const userId = req.user.id;

        const album = await getAlbum(albumId);

        if (!album || album.userId !== userId) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        const updatedAlbum = await updateAlbum(albumId, validatedData);
        res.status(200).send({ status: "success", data: updatedAlbum });

    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).send({ status: "error", message: "Album not found" });
        } else {
            debug("Error when trying to update album with ID", albumId, error);
            res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
        }
    }
};

// Add a photo to an album
export const addPhoto = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId);

    try {
        if (!req.user) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        const userId = req.user.id;

        const album = await getAlbum(albumId);

        if (!album || album.userId !== userId) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        const photoId = Number(req.body.id);

        let photo: Photo | null = await getPhoto(photoId);

        if (!photo) {
            return res.status(404).send({ status: "fail", message: "Photo not found" });
        }

        if (!photo.userId) {
            photo = { ...photo, userId: userId };
        }

        if (photo.userId !== userId) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        const updatedAlbum = await addPhotoToAlbum(photoId, albumId);

        res.status(201).send({ status: 'success', data: updatedAlbum });
    } catch (error: any) {
        let errorMessage = 'Something went wrong when querying the database';
        if (error.code === 'P2025') {
            res.status(404).send({ status: 'fail', message: 'Sorry the photo or album was not found' });
        } else {
            console.error('Error when trying to add photo to an album with ID %d: %O', albumId, error);
            res.status(500).send({ status: 'error', message: errorMessage });
        }
    }
};
