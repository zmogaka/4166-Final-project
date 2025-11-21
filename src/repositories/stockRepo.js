import prisma from "../config/db.js";

export async function getAll() {
  return prisma.stock.findMany();
}

export async function getById(id) {
  return prisma.stock.findUnique({ where: { id } });
}

export async function create(data) {
  return prisma.stock.create({ data });
}

export async function update(id, data) {
  try {
    return await prisma.stock.update({ where: { id }, data });
  } catch (err) {
    if (err.code === "P2025") return null;
    throw err;
  }
}

export async function remove(id) {
  try {
    return await prisma.stock.delete({ where: { id } });
  } catch (err) {
    if (err.code === "P2025") return null;
    throw err;
  }
}
