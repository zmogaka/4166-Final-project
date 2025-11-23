import {
  getAllPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolioById,
  addStockToPortfolio,
  removeStockFromPortfolio,
  getPortfolioStocks,
} from "../services/portfolioService.js";

export async function getAllPortfoliosHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const portfolios = await getAllPortfolios(userId);

    res.status(200).json(
      portfolios.map((p) => ({
        id: p.id,
        userId: p.userId,
        name: p.name,
      }))
    );
  } catch (err) {
    next(err);
  }
}

export async function createPortfolioHandler(req, res, next) {
  try {
    const data = { name: req.body.name, userId: req.user.id };
    const portfolio = await createPortfolio(data);

    res.status(201).json({
      id: portfolio.id,
      userId: portfolio.userId,
      name: portfolio.name,
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePortfolioHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ error: "ID must be a number" });

    const updates = {};
    if (req.body.name) updates.name = req.body.name;

    const updated = await updatePortfolio(id, updates, req.user.id);

    res.status(200).json({
      id: updated.id,
      userId: updated.userId,
      name: updated.name,
    });
  } catch (err) {
    next(err);
  }
}

export async function deletePortfolioHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ error: "ID must be a number" });

    await deletePortfolio(id, req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getPortfolioByIdHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ error: "ID must be a number" });

    const portfolio = await getPortfolioById(id, req.user.id);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json({
      id: portfolio.id,
      userId: portfolio.userId,
      name: portfolio.name,
    });
  } catch (err) {
    next(err);
  }
}

export async function addStockToPortfolioHandler(req, res, next) {
  try {
    const portfolioId = Number(req.params.id);
    const stockId = Number(req.body.stockId);

    if (isNaN(portfolioId) || isNaN(stockId)) {
      return res.status(400).json({ error: "IDs must be numbers" });
    }

    const added = await addStockToPortfolio(portfolioId, stockId, req.user.id);

    res
      .status(201)
      .json({ message: `Stock ${added.stock.symbol} added to portfolio` });
  } catch (err) {
    next(err);
  }
}

export async function removeStockFromPortfolioHandler(req, res, next) {
  try {
    const portfolioId = Number(req.params.id);
    const stockId = Number(req.params.stockId);

    if (isNaN(portfolioId) || isNaN(stockId)) {
      return res.status(400).json({ error: "IDs must be numbers" });
    }

    await removeStockFromPortfolio(portfolioId, stockId, req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getPortfolioStocksHandler(req, res, next) {
  try {
    const portfolioId = Number(req.params.id);
    if (isNaN(portfolioId)) {
      return res.status(400).json({ error: "ID must be a number" });
    }

    const stocks = await getPortfolioStocks(portfolioId, req.user.id);

    res.status(200).json(stocks);
  } catch (err) {
    next(err);
  }
}
