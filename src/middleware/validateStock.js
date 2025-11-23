import { param, body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";
import prisma from "../config/db.js";

export const validateStock = [
  body("symbol")
    .exists({ checkFalsy: true })
    .withMessage("symbol is required")
    .bail()
    .isString()
    .withMessage("symbol must be a string")
    .bail()
    .isLength({ min: 1, max: 10 })
    .withMessage("symbol must be between 1 and 10 characters"),

  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("name must be between 2 and 100 characters"),

  body("sector")
    .exists({ checkFalsy: true })
    .withMessage("sector is required")
    .bail()
    .isString()
    .withMessage("sector must be a string")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("sector must be between 2 and 100 characters"),
  handleValidationErrors,
];

export const validateStockId = [
  param("stockId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("stockId must be a positive integer"),

  body("stockId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("stockId must be a positive integer"),

  body("stockId")
    .optional()
    .custom(async (value, { req }) => {
      const id = parseInt(value || req.params.stockId, 10);

      if (!id) return true;

      const stock = await prisma.stock.findUnique({ where: { id } });

      if (!stock) {
        throw new Error(`stockId ${id} does not exist`);
      }

      return true;
    }),

  handleValidationErrors,
];
