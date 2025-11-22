import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validatePortfolio = {
    create: [
        body('name')
            .notEmpty()
            .withMessage('Portfolio name is required')
            .isLength({ max: 100 })
            .withMessage('Portfolio name must be less than 100 characters')
            .trim()
            .escape(),
        handleValidationErrors
    ],
    
    update: [
        body('name')
            .optional()
            .notEmpty()
            .withMessage('Portfolio name cannot be empty')
            .isLength({ max: 100 })
            .withMessage('Portfolio name must be less than 100 characters')
            .trim()
            .escape(),
        handleValidationErrors
    ],
    
}