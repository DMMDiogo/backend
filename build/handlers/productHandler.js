import productService from "../services/productService.js";
import { validationResult } from "express-validator";
class ProductHandler {
    constructor() {
        this.fetchAll = async (req, res) => {
            try {
                const productList = await productService.fetchAllProducts();
                res.json(productList);
            }
            catch (err) {
                res.status(500).json({ error: "Unable to retrieve products" });
            }
        };
        this.fetchById = async (req, res) => {
            try {
                const productId = req.params.id;
                const productData = await productService.fetchProductById(productId);
                if (!productData) {
                    return res.status(404).json({ error: "Product not found" });
                }
                res.json(productData);
            }
            catch (err) {
                res.status(500).json({ error: "Error retrieving product" });
            }
        };
        this.addProduct = async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const newProduct = req.body;
                const savedProduct = await productService.addProduct(newProduct);
                res.status(201).json(savedProduct);
            }
            catch (err) {
                res.status(500).json({ error: "Unable to create product" });
            }
        };
        this.modifyProduct = async (req, res) => {
            try {
                const productId = req.params.id;
                const updatedProductData = req.body;
                const modifiedProduct = await productService.modifyProduct(productId, updatedProductData);
                if (!modifiedProduct) {
                    return res.status(404).json({ error: "Product not found" });
                }
                res.json(modifiedProduct);
            }
            catch (err) {
                res.status(500).json({ error: "Unable to update product" });
            }
        };
        this.removeProduct = async (req, res) => {
            try {
                const productId = req.params.id;
                const removedProduct = await productService.removeProduct(productId);
                if (!removedProduct) {
                    return res.status(404).json({ error: "Product not found" });
                }
                res.json(removedProduct);
            }
            catch (err) {
                res.status(500).json({ error: "Unable to delete product" });
            }
        };
    }
}
export default new ProductHandler();
