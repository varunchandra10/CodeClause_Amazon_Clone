import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  price: Number,
  products: Array,
  email: String,
  address: Object,
});

const Orders = mongoose.model("orders", OrderSchema);
export default Orders;