import { param, body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";
import prisma from "../config/db.js";

export const validatePortfolioId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Portfolio id must be a positive integer"),
  handleValidationErrors,
];

export const validateCreatePortfolio = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name is required")
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("name must be between 3 and 100 characters"),
  handleValidationErrors,
];

export const validateUpdatePortfolio = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name is required")
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("name must be between 3 and 100 characters"),
  handleValidationErrors,
];

export const validateAddStock = [
  body("stockId")
    .exists({ checkFalsy: true })
    .withMessage("stockId is required")
    .isInt({ min: 1 })
    .withMessage("stockId must be a positive integer"),
  handleValidationErrors,
];

export const validateStockNotInPortfolio = [
  body("stockId").custom(async (value, { req }) => {
    const portfolioId = parseInt(req.params.id, 10);
    const stockId = parseInt(value, 10);

    const existing = await prisma.portfolioStock.findFirst({
      where: {
        portfolioId,
        stockId,
      },
    });

    if (existing) {
      throw new Error("stock already exists in this portfolio");
    }

    return true;
  }),

  handleValidationErrors,
];
