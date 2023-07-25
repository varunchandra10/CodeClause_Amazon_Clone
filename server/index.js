// Import statements
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Products from "./models/Products.js";
import Users from "./models/Users.js";
import Orders from "./models/Orders.js";
import stripe from "stripe";
import dotenv from 'dotenv'

dotenv.config();

// Create an instance of Stripe with the API key
const stripeApiKey = process.env.STRIPE_PRIVATE_KEY;
const stripeInstance = stripe(stripeApiKey);

// Create the Express app
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Connection URL for MongoDB Atlas
const connection_url =
process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API for ADD PRODUCT
app.post("/products/add", async (req, res) => {
  const productDetail = req.body;

  try {
    const createdProducts = await Products.insertMany([productDetail]);
    res.status(201).send(createdProducts[0]);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});

// API for GET PRODUCTS
app.get("/products/get", async (req, res) => {
  try {
    const products = await Products.find().exec();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

// API for SIGNUP
app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);

  const userDetail = {
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  try {
    const user_exist = await Users.findOne({ email: email });

    if (user_exist) {
      res.send({ message: "The Email is already in use !" });
    } else {
      const newUser = await Users.create(userDetail);
      res.send({ message: "User Created Successfully" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// API for LOGIN
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDetail = await Users.findOne({ email: email });

    if (userDetail) {
      const isPasswordValid = bcrypt.compare(password, userDetail.password);
      if (isPasswordValid) {
        res.send(userDetail);
      } else {
        res.send({ error: "Invalid Password" });
      }
    } else {
      res.send({ error: "User does not exist" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// API for PAYMENT
app.post("/payment/create", async (req, res) => {
  const total = req.body.amount;
  console.log("Payment Request received for this amount:", total);

  try {
    const payment = await stripeInstance.paymentIntents.create({
      amount: total * 100,
      currency: "inr",
    });

    res.status(201).send({
      clientSecret: payment.client_secret,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to ADD ORDER DETAILS
app.post("/orders/add", async (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };

  try {
    const order = await Orders.create(orderDetail);
    console.log("Order added to database:", order);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// API to GET ORDER DETAILS
app.post("/orders/get", async (req, res) => {
  const email = req.body.email;

  try {
    const userOrders = await Orders.find({ email: email });
    res.send(userOrders);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(port, () => console.log("Listening on port", port));
