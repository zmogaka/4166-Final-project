import { getUserById } from "../services/userService.js";
import { getPortfolioByIdAndUser } from "../services/portfolioService.js";

export async function authorizeOwnership(req, res, next) {
  const userId = parseInt(req.params.id);
  const user = await getUserById(userId);

  if (user.id !== req.user.id) {
    const error = new Error("Forbidden: insufficient permission");
    error.status = 403;
    return next(error);
  }
  return next();
}

export async function authorizePortfolioOwnership(req, res, next) {
  try {
    const portfolioId = parseInt(req.params.id);
    const userId = req.user.id;

    await getPortfolioByIdAndUser(portfolioId, userId);

    next();
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message
    });

  }
}

