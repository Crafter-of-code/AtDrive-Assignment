import mongoose from "mongoose";
import productsModel from "../model/ProductsModel.js";
export async function getAllProducts(req, res) {
  const result = await productsModel.find({});
  res.status(200).json(result);
}
export async function getSingleProduct(req, res) {
  const result = await productsModel.findById(req.params.id);
  if (result) {
    res.status(200).json(result);
  } else {
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
  // console.log(req.body);
  const { id, product_detail } = req.body;
  const result = await productsModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(String(id), product_detail)
  );
  console.log(result);
  if (req.body) {
    res
      .status(200)
      .json({ type: "success", message: "update has been updated" });
  } else {
    res.json({ message: "body is not found" });
  }
}
