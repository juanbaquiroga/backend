import { check } from "express-validator";

const createProductValidations = [
  check("name", "You need to send product name").notEmpty().trim(),
  check("price", "You need to send product price").notEmpty().trim().isNumeric(),
  check("img", "You need to send product image url").notEmpty().trim(),
  check("stock", "You need to send product stock").notEmpty().trim().isNumeric(),
];

export const productValidations = { createProductValidations };