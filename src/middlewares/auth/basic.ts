import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response, NextFunction  } from "express";
import { getUserByEmail } from "../../services/profile_service";

const debug = Debug("fed23-api-uppgift-1-josefliiine:basic.ts")

export const basic = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello there");

	if (!req.headers.authorization) {
		debug("Authorization header missing");
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	debug("Authorization header: %o", req.headers.authorization);
	const [authSchema, base64Payload] = req.headers.authorization.split(" ");

	if (authSchema.toLowerCase() !== "basic") {
		debug("Authorization schema isn't Basic");
		return res.status(401).send({ status: "fail", message: "Authorization required "});
	}

	const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii");

	const [email, password] = decodedPayload.split(":");

	debug("Email: %s", email);
	debug("Password: %s", password);

	if (!email || !password) {
		debug("User did not send email or password");
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	const user = await getUserByEmail(email);
	if (!user) {
		debug("Sorry, this user %s does not exist", email);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	debug("Yay! This user exists: %O", user);
	const password_correct = await bcrypt.compare(password, user.password);
	if (!password_correct) {
		debug("Sorry, the password for user %s was not correct", email);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	debug("Yay! The password for user %s was correct", email);

	req.user = user;

	next();
}
