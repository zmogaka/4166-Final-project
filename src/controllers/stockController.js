import {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
} from "../services/stockService.js";

export async function getStocksHandler(req, res, next) {
  try {
    const stocks = await getAllStocks();
    res.status(200).json(stocks);
  } catch (err) {
    next(err);
  }
}

export async function getStockByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const stock = await getStockById(id);
    res.status(200).json(stock);
  } catch (err) {
    next(err);
  }
}

export async function createStockHandler(req, res, next) {
  try {
    const stock = await createStock(req.body);
    res.status(201).json(stock);
  } catch (err) {
    next(err);
  }
}

export async function updateStockHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const stock = await updateStock(id, req.body);
    res.status(200).json(stock);
  } catch (err) {
    next(err);
  }
}

export async function deleteStockHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await deleteStock(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
