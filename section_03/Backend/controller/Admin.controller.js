// import {Produc}
import productsModel from "../model/ProductsModel.js";
export async function getAllProducts(req, res) {
  const result = await productsModel.find({});
  res.status(200).json(result);
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
}
export async function update_product_handler(req, res) {
  if (req.body) {
    res.json({ message: "body found" });
  } else {
    res.json({ message: "body is not found" });
  }
}
