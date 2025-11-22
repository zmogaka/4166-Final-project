import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { validatePortfolio } from "../middleware/portfolioValidators.js";
import { authorizePortfolioOwnership } from "../middleware/authorizeOwnership.js";
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

import {
  validateStockIdBody,
  validateStockIdParam,
} from "../middleware/portfolioStockValidators.js";

const router = express.Router();

router.get("/", authenticate, getAllPortfoliosHandler);

router.post(
  "/",
  authenticate,
  validatePortfolio.create,
  createPortfolioHandler
);

router.put(
  "/:id",
  authenticate,
  authorizePortfolioOwnership,
  validatePortfolio.update,
  updatePortfolioHandler
);

router.delete(
  "/:id",
  authenticate,
  authorizePortfolioOwnership,
  deletePortfolioHandler
);

router.get(
  "/:id",
  authenticate,
  authorizePortfolioOwnership,
  getPortfolioByIdHandler
);

router.get(
  "/:id/stocks",
  authenticate,
  authorizePortfolioOwnership,
  getPortfolioStocksHandler
);

router.post(
  "/:id/stocks",
  authenticate,
  authorizePortfolioOwnership,
  validateStockIdBody,
  addStockToPortfolioHandler
);

router.delete(
  "/:id/stocks/:stockId",
  authenticate,
  authorizePortfolioOwnership,
  validateStockIdParam, 
  removeStockFromPortfolioHandler
);

export default router;
