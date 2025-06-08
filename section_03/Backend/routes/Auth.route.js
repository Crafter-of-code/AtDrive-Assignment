import { Router } from "express";
import { signin, login } from "../controller/Auth.controller.js";
const Auth_route = Router();
Auth_route.post("/signin", signin);
Auth_route.post("/login", login);
export default Auth_route;
