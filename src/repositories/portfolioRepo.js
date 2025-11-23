import prisma from "../config/db.js";

export async function findAllByUser(userId) {
  return prisma.portfolio.findMany({
    where: { userId },
    include: {
      portfolioStocks: { include: { stock: true } },
    },
  });
}

export async function findByIdForUser(id, userId) {
  return prisma.portfolio.findFirst({
    where: { id, userId },
    include: {
      portfolioStocks: { include: { stock: true } },
    },
  });
}

export async function create(data) {
  try {
    return await prisma.portfolio.create({ data });
  } catch (error) {
    if (error.code === "P2002") {
      const err = new Error(
        "Portfolio with this name already exists for this user"
      );
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function update(id, userId, updates) {
  try {
    const portfolio = await prisma.portfolio.findFirst({
      where: { id, userId },
    });

    if (!portfolio) return null;

    return await prisma.portfolio.update({
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
    const portfolio = await prisma.portfolio.findFirst({
      where: { id, userId },
    });

    if (!portfolio) return null;

    return await prisma.portfolio.delete({
      where: { id },
    });
  } catch (err) {
    if (err.code === "P2025") return null;
    throw err;
  }
}
