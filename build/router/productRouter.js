import { Router } from "express";
import { check } from "express-validator";
import productHandler from "../handlers/productHandler.js";
const router = Router();
const validateProduct = [
    check("name").notEmpty().withMessage("Product name is required."),
    check("description")
        .notEmpty()
        .withMessage("Product description is required."),
    check("price").isNumeric().withMessage("Product price must be a number."),
    check("ean")
        .optional()
        .isLength({ min: 13, max: 13 })
        .withMessage("EAN must be 13 digits long"),
];
router.get("/products", productHandler.fetchAll);
router.get("/products/:id", productHandler.fetchById);
router.post("/products", validateProduct, productHandler.addProduct);
router.put("/products/:id", validateProduct, productHandler.modifyProduct);
router.delete("/products/:id", productHandler.removeProduct);
export default router;
