import {
  getAllWatchlists,
  getWatchlistById,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
  addStockToWatchlist,
  getStocksInWatchlist,
  removeStockFromWatchlist,
} from "../services/watchlistService.js";

export async function getWatchlistsHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const watchlists = await getAllWatchlists(userId);
    res
      .status(200)
      .json(
        watchlists.map((w) => ({ id: w.id, userId: w.userId, name: w.name }))
      );
  } catch (err) {
    next(err);
  }
}

export async function getWatchlistByIdHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID must be a number" });
    }

    const watchlist = await getWatchlistById(id, req.user.id);
    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    res
      .status(200)
      .json({
        id: watchlist.id,
        userId: watchlist.userId,
        name: watchlist.name,
      });
  } catch (err) {
    next(err);
  }
}

export async function createWatchlistHandler(req, res, next) {
  try {
    const data = { name: req.body.name, userId: req.user.id };
    const watchlist = await createWatchlist(data);
    res
      .status(201)
      .json({
        id: watchlist.id,
        userId: watchlist.userId,
        name: watchlist.name,
      });
  } catch (err) {
    next(err);
  }
}

export async function updateWatchlistHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID must be a number" });
    }

    const updates = {};
    if (req.body.name) updates.name = req.body.name;

    const updated = await updateWatchlist(id, updates, req.user.id);
    res
      .status(200)
      .json({ id: updated.id, userId: updated.userId, name: updated.name });
  } catch (err) {
    next(err);
  }
}

export async function deleteWatchlistHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID must be a number" });
    }

    await deleteWatchlist(id, req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getWatchlistStocksHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID must be a number" });
    }

    const stocks = await getStocksInWatchlist(id, req.user.id);
    res.status(200).json(stocks);
  } catch (err) {
    next(err);
  }
}

export async function addStockToWatchlistHandler(req, res, next) {
  try {
    const watchlistId = Number(req.params.id);
    const stockId = Number(req.body.stockId);

    if (isNaN(watchlistId) || isNaN(stockId)) {
      return res.status(400).json({ error: "IDs must be numbers" });
    }

    const added = await addStockToWatchlist(watchlistId, stockId, req.user.id);
    res
      .status(201)
      .json({ message: `Stock ${added.stock.symbol} added to watchlist` });
  } catch (err) {
    next(err);
  }
}

export async function removeStockFromWatchlistHandler(req, res, next) {
  try {
    const watchlistId = Number(req.params.id);
    const stockId = Number(req.params.stockId);

    if (isNaN(watchlistId) || isNaN(stockId)) {
      return res.status(400).json({ error: "IDs must be numbers" });
    }

    await removeStockFromWatchlist(watchlistId, stockId, req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
