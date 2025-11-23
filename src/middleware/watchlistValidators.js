import { param, body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateWatchlistId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Watchlist id must be a positive integer"),
  handleValidationErrors,
];

export const validateCreateWatchlist = [
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

export const validateUpdateWatchlist = [
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

export const validateStockId = [
  param("stockId")
    .isInt({ min: 1 })
    .withMessage("Stock id must be a positive integer"),
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
