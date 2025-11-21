import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { validatePortfolio } from '../middleware/portfolioValidators.js';
import { authorizePortfolioOwnership } from '../middleware/authorizeOwnership.js';

import { getAllPortfoliosHandler, 
        createPortfolioHandler,
        updatePortfolioHandler,
        deletePortfolioHandler,
        getPortfolioByIdHandler,
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

export default router;