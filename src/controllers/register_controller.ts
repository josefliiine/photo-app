import { Request, Response } from "express";
import { matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { createUser } from "../services/register_service";
import { CreateUser } from "../types/register_types";
import Debug from "debug";

const debug = Debug("fed23-api-uppgift-1-josefliiine:register_controller")

export const register = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
	  return res.status(400).json({ status: "fail", errors: errors.array() });
	}

	const validatedData = matchedData(req);
	console.log("validatedData: %O", validatedData);

	try {
	  const hashedPassword = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10);
	  console.log("Password without hash:", validatedData.password);
	  console.log("Password with hash:", hashedPassword);

	  const data = {
		...validatedData,
		password: hashedPassword,
	  } as CreateUser;

	  const user = await createUser(data);

	  const { id, password, ...userData } = user;

	  return res.status(201).json({ status: "success", data: userData });
	} catch (error) {
	  	console.error("Error when trying to create User: %O", error);
	  	return res.status(500).json({ status: "error", message: "Sorry, the user could not be created in the database" });
	}
  };
