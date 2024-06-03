import { ValidationChain, body, check } from 'express-validator';

export const registerSchema: ValidationChain[] = [
  check('name', "please provide a valid name").exists({ checkFalsy: true }).isString(),
  body('mobileNumber', "please provide a valid mobile Number").isLength({ min: 5 }).exists({ checkFalsy: true }).isNumeric(),
  check('password', "please provide a valid password").isLength({ min: 4 }).exists({ checkFalsy: true }).isString(),

];

export const loginSchema: ValidationChain[] = [
  body('mobileNumber', "please provide a valid mobile Number").isLength({ min: 5 }).exists({ checkFalsy: true }).isNumeric(),
  check('password', "please provide a valid password").isLength({ min: 4 }).exists({ checkFalsy: true }).isString(),
];