import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    ean: { type: String },
    image: { type: String, default: 'no-image.jpg' }
});
export default mongoose.model("Product", ProductSchema);
