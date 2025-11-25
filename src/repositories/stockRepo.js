import prisma from "../config/db.js";

export async function getAll() {
  return prisma.stock.findMany();
}

export async function getById(id) {
  return prisma.stock.findUnique({ where: { id } });
}

export async function create(data) {
  try {
    return await prisma.stock.create({ data });
  } catch (err) {
    if (err.code === "P2002") {
      const error = new Error("Stock with this symbol already exists");
      error.status = 409;
      throw error;
    }
    throw err;
  }
}

export async function update(id, data) {
  try {
    return await prisma.stock.update({ where: { id }, data });
  } catch (err) {
    if (err.code === "P2025") return null;
    if (err.code === "P2002") {
      const error = new Error("Stock with this symbol already exists");
      error.status = 409;
      throw error;
    }
    throw err;
  }
}

export async function remove(id) {
  try {
    return await prisma.stock.delete({ where: { id } });
  } catch (err) {
    if (err.code === "P2025") return null;
    if (err.code === "P2003") {
      const error = new Error(
        "Cannot delete stock because it is used in portfolios or watchlists"
      );
      error.status = 409;
      throw error;
    }
    throw err;
  }
}
