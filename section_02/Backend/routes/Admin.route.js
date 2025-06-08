import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  update_product_handler,
} from "../controller/Admin.controller.js";
const Admin_route = express.Router();
Admin_route.get("/products", getAllProducts);
// post request handler;
Admin_route.post("/addproduct", addProduct);
// delete request handler;
Admin_route.delete("/deleteproduct", deleteProduct);
// get a single product
Admin_route.get("/product/:id", getSingleProduct);
// patch request handler
Admin_route.patch("/product/update", update_product_handler);

export default Admin_route;
