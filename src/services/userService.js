import {
  findAllUsers,
  findUserById,
  update,
} from "../repositories/userRepo.js";
import bcrypt from "bcrypt";
import { Prisma } from "../generated/prisma/index.js";

export async function getAllUsers() {
  return await findAllUsers();
}

export async function getUserById(id) {
  const user = await findUserById(id);
  if (!user) {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
  return user;
}

export async function updateUser(id, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const updatedUser = await update(id, { email, password: hashedPassword });
    return updatedUser;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const error = new Error("Email has already been used");
        error.status = 409;
        throw error;
      }
      throw error;
    }
  }
}
