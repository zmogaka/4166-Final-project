import express from "express";
import {
  getWatchlistsHandler,
  getWatchlistByIdHandler,
  createWatchlistHandler,
  updateWatchlistHandler,
  deleteWatchlistHandler,
  getWatchlistStocksHandler,
  addStockToWatchlistHandler,
  removeStockFromWatchlistHandler,
} from "../controllers/watchlistController.js";

import {
  validateWatchlistId,
  validateCreateWatchlist,
  validateUpdateWatchlist,
  validateAddStock,
  validateStockId,
} from "../middleware/watchlistValidators.js";

import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", authenticate, getWatchlistsHandler);
router.get("/:id", authenticate, validateWatchlistId, getWatchlistByIdHandler);
router.post("/", authenticate, validateCreateWatchlist, createWatchlistHandler);
router.put(
  "/:id",
  authenticate,
  validateWatchlistId,
  validateUpdateWatchlist,
  updateWatchlistHandler
);
router.delete(
  "/:id",
  authenticate,
  validateWatchlistId,
  deleteWatchlistHandler
);

router.get(
  "/:id/stocks",
  authenticate,
  validateWatchlistId,
  getWatchlistStocksHandler
);
router.post(
  "/:id/stocks",
  authenticate,
  validateWatchlistId,
  validateAddStock,
  addStockToWatchlistHandler
);
router.delete(
  "/:id/stocks/:stockId",
  authenticate,
  validateWatchlistId,
  validateStockId,
  removeStockFromWatchlistHandler
);

export default router;
