import { Router } from "express";
import { getAllProduct } from "../controller/Client.controller.js";
const Client_route = Router();
Client_route.get("/client/products", getAllProduct);
export default Client_route;
