import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

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

  body("companyName")
    .exists({ checkFalsy: true })
    .withMessage("companyName is required")
    .bail()
    .isString()
    .withMessage("companyName must be a string")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("companyName must be between 2 and 100 characters"),

  body("currentPrice")
    .exists({ checkFalsy: true })
    .withMessage("currentPrice is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("currentPrice must be a positive number"),

  handleValidationErrors,
];
