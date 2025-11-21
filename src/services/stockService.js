import * as repo from "../repositories/stockRepo.js";

export async function getAllStocks() {
  return repo.getAll();
}

export async function getStockById(id) {
  const stock = await repo.getById(id);
  if (!stock) {
    const error = new Error(`Cannot find stock with id ${id}`);
    error.status = 404;
    throw error;
  }
  return stock;
}

export async function createStock(data) {
  return repo.create(data);
}

export async function updateStock(id, data) {
  const updated = await repo.update(id, data);
  if (!updated) {
    const error = new Error(`Cannot find stock with id ${id}`);
    error.status = 404;
    throw error;
  }
  return updated;
}

export async function deleteStock(id) {
  const deleted = await repo.remove(id);
  if (!deleted) {
    const error = new Error(`Cannot find stock with id ${id}`);
    error.status = 404;
    throw error;
  }
}
