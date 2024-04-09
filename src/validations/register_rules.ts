import { body } from "express-validator";
import { getUserByEmail } from "../services/register_service";

export const createUserRules = [
	body("first_name")
	.isString().withMessage("Name has to be a string").bail()
	.trim().isLength({ min: 3 }).withMessage("Firstname has to contain at least 3 letters"),

	body("last_name")
	.isString().withMessage("Name has to contain letters").bail()
	.trim().isLength({ min: 3 }).withMessage("Lastname has to contain at least 3 letters"),

	body("email")
	.trim().isEmail().withMessage("Has to be a valid email").bail()
	.custom(async (value) => {
		const user = await getUserByEmail(value);

		if(user) {
			throw new Error("Sorry, that email exists already");
		}
	}),

	body("password")
	.isString().withMessage("Password must be a string").bail()
	.trim().isLength({ min: 6 }).withMessage("Password must contain a minimum of 6 letters"),
];
