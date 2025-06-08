import { product } from "../data/products.js";
// import {Produc}
import productsModel from "../model/ProductsModel.js";
import products from "../model/ProductsModel.js";
export async function getAllProducts(req, res) {
  const result = await productsModel.find({});
  console.log(result);
  res.json(result);
}
export async function getSingleProduct(req, res) {
  console.log(req.params.id);
  const result = await productsModel.findById(req.params.id);
  console.log(result);
  if (result) {
    res.status(200).json(result);
  }
  // res.json();
  else {
    res.send(404).json({ message: "Your quary is not found" });
  }
}
export async function addProduct(req, res) {
  console.log(req.body, "product added");
  const result = await productsModel.insertOne(req.body);
  console.log(result);
}
export async function deleteProduct(req, res) {
  const result = await productsModel.deleteOne({ _id: req.body._id });
  console.log(result);
}
export async function update_product_handler(req, res) {
  console.log(req.body.body);
  if (req.body) {
    res.json({ message: "body found" });
  } else {
    res.json({ message: "body is not found" });
  }
}
