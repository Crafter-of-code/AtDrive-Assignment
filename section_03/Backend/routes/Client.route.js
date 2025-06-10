import { Router } from "express";
import cookieParser from "cookie-parser";
import {
  getAllProduct,
  get_cart_handler,
  create_order,
  all_orders,
  getSingleOrder,
  deleteOrder,
} from "../controller/Client.controller.js";
import cookieChecker from "../middleware/cookieChecker.js";

const Client_route = Router();
Client_route.use(cookieParser());
Client_route.get("/shop", getAllProduct);
Client_route.post("/cart", get_cart_handler);
Client_route.post("/cart/createorder", create_order);
Client_route.get("/shop/myorders", all_orders);
Client_route.get("/shop/order/:id", getSingleOrder);
Client_route.delete("/shop/order/:id", deleteOrder);
export default Client_route;
