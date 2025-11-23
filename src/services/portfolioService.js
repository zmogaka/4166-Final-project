import prisma from "../config/db.js";
import * as portfolioRepo from "../repositories/portfolioRepo.js";

export async function getAllPortfolios(userId) {
  return portfolioRepo.findAllByUser(userId);
}

export async function getPortfolioById(id, userId) {
  return portfolioRepo.findByIdForUser(id, userId);
}

export async function createPortfolio(data) {
  return portfolioRepo.create(data);
}

export async function updatePortfolio(id, updates, userId) {
  const updated = await portfolioRepo.update(id, userId, updates);
  if (!updated) {
    const error = new Error(`Cannot find portfolio with id ${id}`);
    error.status = 404;
    throw error;
  }
  return updated;
}

export async function deletePortfolio(id, userId) {
  const removed = await portfolioRepo.remove(id, userId);
  if (!removed) {
    const error = new Error(`Cannot find portfolio with id ${id}`);
    error.status = 404;
    throw error;
  }
  return removed;
}

export async function getPortfolioStocks(portfolioId, userId) {
  const portfolio = await portfolioRepo.findByIdForUser(portfolioId, userId);
  if (!portfolio) {
    const error = new Error(`Cannot find portfolio with id ${portfolioId}`);
    error.status = 404;
    throw error;
  }

  return portfolio.portfolioStocks.map((ps) => ps.stock);
}

export async function addStockToPortfolio(portfolioId, stockId, userId) {
  const portfolio = await portfolioRepo.findByIdForUser(portfolioId, userId);
  if (!portfolio) {
    const error = new Error(`Cannot find portfolio with id ${portfolioId}`);
    error.status = 404;
    throw error;
  }

  const exists = portfolio.portfolioStocks.find((ps) => ps.stockId === stockId);
  if (exists) {
    const error = new Error("Stock already exists in portfolio");
    error.status = 409;
    throw error;
  }

  return await prisma.portfolioStock.create({
    data: { portfolioId, stockId },
    include: { stock: true },
  });
}

export async function removeStockFromPortfolio(portfolioId, stockId, userId) {
  const portfolio = await portfolioRepo.findByIdForUser(portfolioId, userId);
  if (!portfolio) {
    const error = new Error(`Cannot find portfolio with id ${portfolioId}`);
    error.status = 404;
    throw error;
  }

  try {
    return await prisma.portfolioStock.delete({
      where: { portfolioId_stockId: { portfolioId, stockId } },
    });
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error("Stock not found in portfolio");
      error.status = 404;
      throw error;
    }
    throw err;
  }
}
