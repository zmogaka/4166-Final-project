import prisma from '../config/db.js';

export async function getAll(filter) {
    const conditions = {};

    if (filter?.userId) {
        conditions.userId = filter.userId;
    }

    if (filter?.name) {
        conditions.name = {
            contains: filter.name,
            mode: "insensitive"
        };
    }

    const portfolios = await prisma.portfolio.findMany({
        where: conditions,
        select: {
            id: true,
            userId: true,
            name: true,

        }
    });
    return portfolios;
}


export async function create(data) {
    try {
        const newPortfolio = await prisma.portfolio.create({
            data: data,
        });
        return newPortfolio;
    } catch (error) {
        if (error.code === 'P2002') {
            throw new Error('Portfolio with this name already exists for this user');
        }
        throw error;
    }
}

export async function update(id, updates) {
    try {
        const updatedPortfolio = await prisma.portfolio.update({
            where: { id: parseInt(id) },
            data: updates,
        });
        return updatedPortfolio;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id) {
    try {
        const deletedPortfolio = await prisma.portfolio.delete({
            where: { id: parseInt(id) },
        });
        return deletedPortfolio;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function getById(id) {
    try {
        const portfolio = await prisma.portfolio.findUnique({
            where: { id: parseInt(id) },
            include: {
                portfolioStocks: {
                    include: {
                        stock: true
                    }
                }
            }
        });
        return portfolio;
    } catch (error) {
        console.error('Portfolio not found', error);
        throw error;
    }
}

export async function getByIdAndUserId(id, userId) {
    try {
        const portfolio = await prisma.portfolio.findFirst({
            where: {
                id: parseInt(id),
                userId: parseInt(userId)
            },
            include: {
                portfolioStocks: {
                    include: {
                        stock: true
                    }
                }
            }
        });
        return portfolio;
    } catch (error) {
        console.error('Error in getByIdAndUserId:', error);
        throw error;
    }
}

export async function addStock(portfolioId, stockId) {
    try {
        const portfolioStock = await prisma.portfolioStock.create({
            data: {
                portfolioId: parseInt(portfolioId),
                stockId: parseInt(stockId),
            },
            include:{
                stock: true,
            },
        });
        return portfolioStock
    } catch (error) {
        if (error.code === 'P2002') {
            throw new Error('Stock already exists in portfolio');
        }
        if (error.code === 'P2003') {
            throw new Error('Portfolio or Stock not found');
        }
        throw error;
    }
}


export async function removeStock(portfolioId, stockId) {
    try {
        const result = await prisma.portfolioStock.deleteMany({
            where: {
                portfolioId: parseInt(portfolioId),
                stockId: parseInt(stockId)
            }
        });
        return result.count > 0;
    } catch (error) {
        throw error;
    }
}

export async function getPortfolioStocks(portfolioId){
    try{
        const portfolioStocks = await prisma.portfolioStock.findMany({
            where: {
                portfolioId: parseInt(portfolioId)
            },
            include: {
                stock: true
            }
        });
        return portfolioStocks;
    } catch(err){
        return err;
    }
}
