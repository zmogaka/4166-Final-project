import prisma from "../config/db.js";

export async function createUser(data) {
  return await prisma.user.create({ data: data, omit: { password: true } });
}

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });
}

export async function findAllUsers() {
  return await prisma.user.findMany({ omit: { password: true } });
}

export async function update(id, data) {
  try {
    return await prisma.user.update({
      where: { id },
      data: data,
      omit: { password: true },
    });
  } catch (err) {
    if (err.code === "P2025") return null;
    throw err;
  }
}

export async function remove(id) {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (err) {
    if (err.code === "P2025") return null;
    throw err;
  }
}
