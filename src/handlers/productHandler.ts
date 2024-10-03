import { Request, Response } from "express";
import { IProduct } from "../model/productModel.js";
import productService from "../services/productService.js";
import { validationResult } from "express-validator";

class ProductHandler {
  fetchAll = async (req: Request, res: Response) => {
    try {
      const productList: IProduct[] = await productService.fetchAllProducts();
      res.json(productList);
    } catch (err) {
      res.status(500).json({ error: "Unable to retrieve products" });
    }
  };

  fetchById = async (req: Request, res: Response) => {
    try {
      const productId: string = req.params.id;
      const productData = await productService.fetchProductById(productId);

      if (!productData) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(productData);
    } catch (err) {
      res.status(500).json({ error: "Error retrieving product" });
    }
  };

  addProduct = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newProduct: IProduct = req.body;
      const savedProduct: IProduct = await productService.addProduct(
        newProduct
      );
      res.status(201).json(savedProduct);
    } catch (err) {
      res.status(500).json({ error: "Unable to create product" });
    }
  };

  modifyProduct = async (req: Request, res: Response) => {
    try {
      const productId: string = req.params.id;
      const updatedProductData: IProduct = req.body;
      const modifiedProduct = await productService.modifyProduct(
        productId,
        updatedProductData
      );

      if (!modifiedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(modifiedProduct);
    } catch (err) {
      res.status(500).json({ error: "Unable to update product" });
    }
  };

  removeProduct = async (req: Request, res: Response) => {
    try {
      const productId: string = req.params.id;
      const removedProduct = await productService.removeProduct(productId);

      if (!removedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(removedProduct);
    } catch (err) {
      res.status(500).json({ error: "Unable to delete product" });
    }
  };
}

export default new ProductHandler();
