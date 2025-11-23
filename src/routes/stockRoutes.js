import express from "express";
import { validateStockId, validateStock } from "../middleware/validateStock.js";
import { authenticate, isAdmin } from "../middleware/authenticate.js";
import {
  getStocksHandler,
  getStockByIdHandler,
  createStockHandler,
  updateStockHandler,
  deleteStockHandler,
} from "../controllers/stockController.js";

const router = express.Router();

router.get("/", getStocksHandler);
router.get("/:id", getStockByIdHandler);
router.post("/", authenticate, isAdmin, validateStock, createStockHandler);
router.put(
  "/:id",
  authenticate,
  isAdmin,
  validateStockId,
  validateStock,
  updateStockHandler
);
router.delete("/:id", authenticate, isAdmin, deleteStockHandler);

export default router;
