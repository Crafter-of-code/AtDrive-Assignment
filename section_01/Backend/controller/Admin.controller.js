import mongoose from "mongoose";
import { product } from "../data/products.js";
// import {Produc}
import productsModel from "../model/ProductsModel.js";
import products from "../model/ProductsModel.js";
export async function getAllProducts(req, res) {
  const result = await productsModel.find({});
  res.json(result);
}
export async function getSingleProduct(req, res) {
  const result = await productsModel.findById(req.params.id);
  if (result) {
    res.status(200).json(result);
  }
  // res.json();
  else {
    res.send(404).json({ message: "Your quary is not found" });
  }
}
export async function addProduct(req, res) {
  const result = await productsModel.insertOne(req.body);
}
export async function deleteProduct(req, res) {
  const result = await productsModel.deleteOne({ _id: req.body._id });
  const reponse_data_to_send = await productsModel.find();
  res.json(reponse_data_to_send);
}
export async function update_product_handler(req, res) {
  console.log(req.body);
  if (req.body) {
    const result = await productsModel.findByIdAndUpdate(
      req.body.id,
      req.body.product_detail
    );
    res.json({ message: "the product is updated" });
  } else {
    res.json({ message: "body is not found" });
  }
}
