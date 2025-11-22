import prisma from "../config/db.js";

export async function findAllByUser(userId) {
  return prisma.watchlist.findMany({
    where: { userId },
    include: {
      watchlistStocks: { include: { stock: true } },
    },
  });
}

export async function findByIdForUser(id, userId) {
  return prisma.watchlist.findFirst({
    where: { id, userId },
    include: {
      watchlistStocks: { include: { stock: true } },
    },
  });
}

export async function create(data) {
  try {
    return await prisma.watchlist.create({ data });
  } catch (error) {
    if (error.code === "P2002") {
      const err = new Error(
        "Watchlist with this name already exists for this user"
      );
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function update(id, userId, updates) {
  try {
    const watchlist = await prisma.watchlist.findFirst({
      where: { id, userId },
    });

    if (!watchlist) return null;

    return await prisma.watchlist.update({
      where: { id },
      data: updates,
    });
  } catch (err) {
    if (err.code === "P2025") return null;
    throw err;
  }
}

export async function remove(id, userId) {
  try {
    const watchlist = await prisma.watchlist.findFirst({
      where: { id, userId },
    });

    if (!watchlist) return null;

    return await prisma.watchlist.delete({
      where: { id },
    });
  } catch (err) {
    if (err.code === "P2025") return null;
    throw err;
  }
}
