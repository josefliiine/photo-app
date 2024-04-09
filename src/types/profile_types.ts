import { User } from "@prisma/client";

export type UserId = Pick<User, "id">;
