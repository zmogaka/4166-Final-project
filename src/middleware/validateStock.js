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
    .optional()
    .isString()
    .withMessage("sector must be a string")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("sector must be between 2 and 100 characters"),

  handleValidationErrors,
];
