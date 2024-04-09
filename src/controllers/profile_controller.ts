import { Request, Response } from "express";
import Debug from "debug";
import { addUserPhotos, addUserAlbums, getUserPhotos, getUserAlbums, getUserById } from "../services/register_service";
import { getUserByEmail } from "../services/register_service";

const debug = Debug("fed23-api-uppgift-1-josefliiine:user_controller")

// Get a user
export const getProfile = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ status: "fail", message: "Authentication required" });
    }

    try {
        const user = await getUserById(req.user.id);

        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        const userByEmail = await getUserByEmail(user.email);
        if (!userByEmail) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        const userData = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        };

        res.status(200).json({ status: "success", data: userData });
    } catch (error) {
        console.error("Error while fetching user profile:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

// Get authenticated users photos
export const getPhotos = async (req: Request, res: Response) => {
	if (!req.user) {
		throw new Error("Trying to access autenticated user but none exists");
	}

	const userId = req.user.id;

	try {
		const photos = await getUserPhotos(userId);

		res.send({
			status: "success",
			data: photos,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
}

// Get authenticated users albums
export const getAlbums = async (req: Request, res: Response) => {
	if (!req.user) {
		throw new Error("Trying to access autenticated user but none exists.");
	}

	const userId = req.user.id;

	try {
		const albums = await getUserAlbums(userId);

		res.send({
			status: "success",
			data: albums,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
}

// Add photos to authenticated user
export const addPhotos = async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error("Trying to access autenticated user but none exists.");
    }

    const userId = req.user.id;

    try {
        const photos = req.body.filter((photo: any) => photo.userId === userId);

        if (photos.length !== req.body.length) {
            return res.status(401).send({ status: "fail", message: "Unauthorized" });
        }

        const addedPhotos = await addUserPhotos(userId, photos);

        res.send({
            status: "success",
            data: addedPhotos,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
    }
}

// Add albums to authenticated user
export const addAlbums = async (req: Request, res: Response) => {
	if (!req.user) {
		throw new Error("Trying to access autenticated user but none exists.");
	}

	const userId = req.user.id;

	try {
		const albums = await addUserAlbums(userId, req.body);

		res.send({
			status: "success",
			data: albums,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
}

