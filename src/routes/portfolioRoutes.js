import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  validateAddStock,
  validateCreatePortfolio,
  validatePortfolioId,
  validateUpdatePortfolio,
} from "../middleware/portfolioValidators.js";
import { validateStockId } from "../middleware/validateStock.js";
import {
  getAllPortfoliosHandler,
  createPortfolioHandler,
  updatePortfolioHandler,
  deletePortfolioHandler,
  getPortfolioByIdHandler,
  getPortfolioStocksHandler,
  addStockToPortfolioHandler,
  removeStockFromPortfolioHandler,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/", authenticate, getAllPortfoliosHandler);

router.get("/:id", authenticate, validatePortfolioId, getPortfolioByIdHandler);

router.post("/", authenticate, validateCreatePortfolio, createPortfolioHandler);

router.put(
  "/:id",
  authenticate,
  validatePortfolioId,
  validateUpdatePortfolio,
  updatePortfolioHandler
);

router.delete(
  "/:id",
  authenticate,
  validatePortfolioId,
  deletePortfolioHandler
);

router.get(
  "/:id/stocks",
  authenticate,
  validatePortfolioId,
  getPortfolioStocksHandler
);

router.post(
  "/:id/stocks",
  authenticate,
  validatePortfolioId,
  validateStockId,
  validateAddStock,
  addStockToPortfolioHandler
);

router.delete(
  "/:id/stocks/:stockId",
  authenticate,
  validatePortfolioId,
  validateStockId,
  removeStockFromPortfolioHandler
);

export default router;
