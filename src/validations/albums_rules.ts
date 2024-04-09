import { body } from "express-validator";

export const createAlbumRules = [
	body("title")
		.isString().withMessage("Title has to be a string").bail()
		.trim().isLength({ min: 3 }).withMessage("Title has to contain at least 3 letters"),
];

export const updateAlbumRules = [
	body("title")
		.isString().withMessage("Title has to be a string").bail()
		.trim().isLength({ min: 3 }).withMessage("Title has to contain at least 3 letters"),
];
