import ProductModel from "../model/productModel.js";
class ProductService {
    constructor() {
        this.fetchAllProducts = async () => {
            try {
                return await ProductModel.find();
            }
            catch (error) {
                throw new Error("Unable to retrieve all products");
            }
        };
        this.fetchProductById = async (id) => {
            try {
                const product = await ProductModel.findById(id);
                return product;
            }
            catch (error) {
                throw new Error("Unable to retrieve product by id");
            }
        };
        this.addProduct = async (productData) => {
            try {
                const newProduct = await ProductModel.create(productData);
                return newProduct;
            }
            catch (error) {
                throw new Error("Unable to create product");
            }
        };
        this.modifyProduct = async (id, updatedData) => {
            try {
                const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
                return updatedProduct;
            }
            catch (error) {
                throw new Error("Unable to update product");
            }
        };
        this.removeProduct = async (id) => {
            try {
                const deletedProduct = await ProductModel.findByIdAndDelete(id);
                return deletedProduct;
            }
            catch (error) {
                throw new Error("Unable to delete product");
            }
        };
    }
}
export default new ProductService();
