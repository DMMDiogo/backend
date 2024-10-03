import { IProduct } from "../model/productModel.js";
import ProductModel from "../model/productModel.js";

class ProductService {
  fetchAllProducts = async (): Promise<IProduct[]> => {
    try {
      return await ProductModel.find();
    } catch (error) {
      throw new Error("Unable to retrieve all products");
    }
  };

  fetchProductById = async (id: string): Promise<IProduct | null> => {
    try {
      const product: IProduct | null = await ProductModel.findById(id);
      return product;
    } catch (error) {
      throw new Error("Unable to retrieve product by id");
    }
  };

  addProduct = async (productData: IProduct): Promise<IProduct> => {
    try {
      const newProduct = await ProductModel.create(productData);
      return newProduct;
    } catch (error) {
      throw new Error("Unable to create product");
    }
  };

  modifyProduct = async (
    id: string,
    updatedData: IProduct
  ): Promise<IProduct | null> => {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      throw new Error("Unable to update product");
    }
  };

  removeProduct = async (id: string): Promise<IProduct | null> => {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(id);
      return deletedProduct;
    } catch (error) {
      throw new Error("Unable to delete product");
    }
  };
}

export default new ProductService();
