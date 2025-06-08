import productsModel from "../model/ProductsModel.js";
export async function getAllProduct(req, res) {
  const result = await productsModel.find({});
  res.send(result);
}
