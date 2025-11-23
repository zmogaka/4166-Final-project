import prisma from "../config/db.js";
import * as watchlistRepo from "../repositories/watchlistRepository.js";

export async function getAllWatchlists(userId) {
  return watchlistRepo.findAllByUser(userId);
}

export async function getWatchlistById(id, userId) {
  return watchlistRepo.findByIdForUser(id, userId);
}

export async function createWatchlist(data) {
  return watchlistRepo.create(data);
}

export async function updateWatchlist(id, updates, userId) {
  const updated = await watchlistRepo.update(id, userId, updates);
  if (!updated) {
    const error = new Error(`Cannot find watchlist with id ${id}`);
    error.status = 404;
    throw error;
  }
  return updated;
}

export async function deleteWatchlist(id, userId) {
  const removed = await watchlistRepo.remove(id, userId);
  if (!removed) {
    const error = new Error(`Cannot find watchlist with id ${id}`);
    error.status = 404;
    throw error;
  }
  return removed;
}

export async function getStocksInWatchlist(watchlistId, userId) {
  const watchlist = await watchlistRepo.findByIdForUser(watchlistId, userId);
  if (!watchlist) {
    const error = new Error(`Cannot find watchlist with id ${watchlistId}`);
    error.status = 404;
    throw error;
  }
  return watchlist.watchlistStocks.map((ws) => ws.stock);
}

export async function addStockToWatchlist(watchlistId, stockId, userId) {
  const watchlist = await watchlistRepo.findByIdForUser(watchlistId, userId);
  if (!watchlist) {
    const error = new Error(`Cannot find watchlist with id ${watchlistId}`);
    error.status = 404;
    throw error;
  }

  const exists = watchlist.watchlistStocks.find((ws) => ws.stockId === stockId);
  if (exists) {
    const error = new Error("Stock already exists in watchlist");
    error.status = 409;
    throw error;
  }

  try {
    return await prisma.watchlistStock.create({
      data: { watchlistId, stockId },
      include: { stock: true },
    });
  } catch (err) {
    if (err.code === "P2003") {
      const error = new Error("Stock not found");
      error.status = 404;
      throw error;
    }
    throw err;
  }
}

export async function removeStockFromWatchlist(watchlistId, stockId, userId) {
  const watchlist = await watchlistRepo.findByIdForUser(watchlistId, userId);
  if (!watchlist) {
    const error = new Error(`Cannot find watchlist with id ${watchlistId}`);
    error.status = 404;
    throw error;
  }

  try {
    return await prisma.watchlistStock.delete({
      where: { watchlistId_stockId: { watchlistId, stockId } },
    });
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error("Stock not found in watchlist");
      error.status = 404;
      throw error;
    }
    throw err;
  }
}
