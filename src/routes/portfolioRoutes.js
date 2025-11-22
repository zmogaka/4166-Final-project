import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { validatePortfolio } from '../middleware/portfolioValidators.js';
import { authorizePortfolioOwnership } from '../middleware/authorizeOwnership.js';
import { validateStock } from '../middleware/validateStock.js';
import {
        getAllPortfoliosHandler,
        createPortfolioHandler,
        updatePortfolioHandler,
        deletePortfolioHandler,
        getPortfolioByIdHandler,
        getPortfolioStocksHandler,
        addStockToPortfolioHandler,
        removeStockFromPortfolioHandler
} from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/', authenticate, getAllPortfoliosHandler);


router.post('/', authenticate,
        validatePortfolio.create,
        createPortfolioHandler);

router.put('/:id', authenticate,
        authorizePortfolioOwnership,
        validatePortfolio.update,
        updatePortfolioHandler);

router.delete('/:id',
        authenticate,
        authorizePortfolioOwnership,
        deletePortfolioHandler);

router.get('/:id', authenticate, getPortfolioByIdHandler);


router.get('/:id/stocks',
        authenticate,
        authorizePortfolioOwnership,
        getPortfolioStocksHandler);

router.post('/:id/stocks',
        authenticate,
        authorizePortfolioOwnership,
        validateStock,
        addStockToPortfolioHandler);

router.delete('/:id/stocks/:stockId',
        authenticate,
        authorizePortfolioOwnership,
        validateStock,
        removeStockFromPortfolioHandler);

export default router;