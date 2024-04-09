import { body } from "express-validator";

export const createPhotoRules = [
    body("title")
        .isString().withMessage("Title has to be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("Title has to contain at least 3 letters"),
    body("url")
        .isString().withMessage("Url has to be a string").bail()
        .isURL().withMessage("Url has to be a Url"),
	body("comment")
		.optional()
		.isString().withMessage("Comment has to be a string").bail()
		.isLength({ min: 3 }).withMessage("Comment has to contain at least 3 letters"),
];

export const updatePhotoRules = [
	body("title")
		.isString().withMessage("Title has to be a string").bail()
		.trim().isLength({ min: 3 }).withMessage("Title has to contain at least 3 letters"),
	body("url")
		.isString().withMessage("Url has to be a string").bail()
		.isURL().withMessage("Url has to be a Url"),
	body("comment")
		.optional()
		.isString().withMessage("Comment has to be a string").bail()
		.isLength({ min: 3 }).withMessage("Comment has to contain at least 3 letters"),
];
