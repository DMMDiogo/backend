import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: {type: String, require: true},
  price: {type: Number, require: true},
  ean: {type: String},
  image: {type: String, default: 'no-image.jpg'}
});

export interface IProduct extends mongoose.Document {
  name: string,
  description?: string,
  price: number,
  ean?: string,
  image?: string
}

export default mongoose.model<IProduct>("Product", ProductSchema);