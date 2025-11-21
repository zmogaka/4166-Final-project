import * as repo from '../repositories/portfolioRepo.js';

export async function getAllPortfolios(filter){
    return  await repo.getAll(filter);
}
export async function createPortfolio(data){
    return await repo.create(data);
}
export async function getPortfolioById(id) {
    const portfolio = await repo.getById(id);
    if (portfolio) return portfolio;
    else {
        const error = new Error(`Cannot find portfolio with id ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function updatePortfolio(id, data){
    const updatedPortfolio = await repo.update(id, data);
    if (updatedPortfolio) return updatedPortfolio;
    else{
        const error = new Error(`Cannot find portfolio with id ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function deletePortfolio(id){
    const result = await repo.remove(id);
    if (result) return;
    else{
        const error = new Error(`Cannot find portfolio with id ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function getPortfolioByIdAndUser(id, userId){
    const portfolio = await repo.getById(id);
    if (!portfolio){
        const error = new Error(`Cannot find portfolio with id ${id}`);
        error.status = 404;
        throw error;
    }
    if (portfolio.userId !== userId) {
        const error = new Error(`Access denied to portfolio ${id}`);
        error.status = 403;
        throw error;
    }
    return portfolio;
}