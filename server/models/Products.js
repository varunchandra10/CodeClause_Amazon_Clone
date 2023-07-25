import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  title: String,
  imageURL: String,
  price: Number,
  rating: Number,
});

const Products = mongoose.model("products", ProductSchema);
export default Products;