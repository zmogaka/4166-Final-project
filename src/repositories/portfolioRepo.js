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

