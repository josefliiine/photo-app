import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { createPhoto, getPhoto, getPhotos, updatePhoto } from "../services/photos_service";
import { CreatePhoto, UpdatePhoto, PhotoId } from "../types/photos_types";
import { PrismaClient, Photo as PhotoType } from '@prisma/client';

const prisma = new PrismaClient();
const debug = Debug("fed23-api-uppgift-1-josefliiine:photo_controller");

// Get all photos
export const index = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        const userId = req.user.id;
        const photos = await getPhotos(userId);
        res.send({ status: "success", data: photos });
    } catch (error) {
        console.error("Error when trying to find all photos", error);
        res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
    }
};

// Get a single photo
export const show = async (req: Request, res: Response) => {
    const photoId = Number(req.params.photoId);

    try {
        if (!req.user) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        const userId = req.user.id;

        const photo = await prisma.photo.findUnique({
            where: {
                id: photoId,
            },
        });

        if (!photo) {
            return res.status(404).send({ status: "fail", message: "Photo not found" });
        }

        if (photo.userId !== userId) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        res.send({ status: "success", data: photo });
    } catch (error: any) {
        debug("Error when trying to find photo with ID %d: %O", photoId, error);
        res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
    }
};

// Create a new photo
export const store = async (req: Request, res: Response) => {

	const validationErrors = validationResult(req);

    // If validation errors, respond with errors and stop request ✋🏻
    if (!validationErrors.isEmpty()) {
        res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        });
        return;
    }

    const validatedData = matchedData(req) as CreatePhoto;

    if (!req.user) {
        return res.status(401).send({ status: "fail", message: "Unauthorized" });
    }
    const userId = req.user.id;
    validatedData.userId = userId;

    try {
        const photo = await createPhoto(validatedData);

		res.status(201).send({ status: "success", data: photo });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Something went wrong when creating the record in the database" });
    }
};

// Update a photo
export const update = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    // If validation errors, respond with errors and stop request ✋🏻
    if (!validationErrors.isEmpty()) {
        res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        });
        return;
    }

    const photoId = Number(req.params.photoId);
    const userId = req.user?.id;

    try {
        // Check if the user is authenticated
        if (!userId) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        // Fetch the photo from the database
        const photo = await getPhoto(photoId);

        // Check if the photo exists and if the user is the owner
        if (!photo || photo.userId !== userId) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        // Extract the fields to be updated from the request body
        const { title, comment } = req.body;

        // Perform the partial update of the photo
        const updatedPhoto = await updatePhoto(photoId, { title, comment });

        // Respond with the updated photo
        res.status(200).send({ status: "success", data: updatedPhoto });

    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).send({ status: "fail", message: "Photo not found" });
        } else {
            console.error("Error when trying to update photo with ID", photoId, error);
            res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
        }
    }
};
