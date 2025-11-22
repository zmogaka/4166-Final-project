import {
    getAllPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioById,
    addStockToPortfolio,
    removeStockFromPortfolio,
    getPortfolioStocks
} from '../services/portfolioService.js';

export async function getAllPortfoliosHandler(req, res, next) {
    try {
        const {
            name,
            userId
        } = req.query;

        const filter = {};
        if (name) filter.name = name;
        if (userId) filter.userId = parseInt(userId);

        const result = await getAllPortfolios(filter);
        res.status(200).json({
            success: true,
            data: result,
            count: result.length
        });
    } catch (err) {
        next(err);
    }
}

export async function createPortfolioHandler(req, res, next) {
    try {
        const userId = req.user?.id || 1;

        const data = {
            userId: userId,
            name: req.body.name
        };
        const newPortfolio = await createPortfolio(data);
        res.status(201).json({
            success: true,
            data: newPortfolio,
            message: 'Portfolio created successfully'
        });
    } catch (err) {
        next(err);
    }
}

export async function updatePortfolioHandler(req, res, next) {
    try {
        let id = parseInt(req.params.id);
        const updates = {};
        if (req.body.name) updates.name = req.body.name;

        const updatedPortfolio = await updatePortfolio(id, updates);
        res.status(200).json({
            success: true,
            data: updatedPortfolio,
            message: 'Portfolio updated successfully'
        });
    } catch (err) {
        next(err);
    }
}

export async function deletePortfolioHandler(req, res, next) {
    try {
        let id = parseInt(req.params.id);
        await deletePortfolio(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

export async function getPortfolioByIdHandler(req, res, next) {
    try {
        let id = parseInt(req.params.id);
        const portfolio = await getPortfolioById(id);

        res.status(200).json({
            success: true,
            data: portfolio
        });
    } catch (err) {
        next(err);
    }
}

export async function addStockToPortfolioHandler(req, res, next) {
    try {
        const portfolioId = parseInt(req.params.id);
        const { stockId } = req.body;

        if (!stockId) {
            return res.status(400).json({
                success: false,
                error: 'Stock ID is required'
            });
        }

        const result = await addStockToPortfolio(portfolioId, stockId);

        res.status(201).json({
            success: true,
            message: `Stock ${result.stock.symbol} added to portfolio`
        });
    } catch (err) {
        next(err);
    }
}

export async function removeStockFromPortfolioHandler(req, res, next) {
    try {
        const portfolioId = parseInt(req.params.id);
        const stockId = parseInt(req.params.stockId);

        await removeStockFromPortfolio(portfolioId, stockId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

export async function getPortfolioStocksHandler(req, res, next) {
    try {
        const portfolioId = parseInt(req.params.id);
        const portfolioStocks = await getPortfolioStocks(portfolioId);

        const stocks = portfolioStocks.map( ps => ({
            id: ps.stock.id,
            symbol: ps.stock.symbol,
            name: ps.stock.name,
            sector: ps.stock.sector

        }));
        res.status(200).json({
            success: true,
            data: stocks,
            count: stocks.length
        });
    } catch (err) {
        next(err);
    }
}