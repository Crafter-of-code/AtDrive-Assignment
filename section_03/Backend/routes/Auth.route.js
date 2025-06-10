import { Router } from "express";
import { signin, login, logout } from "../controller/Auth.controller.js";
const Auth_route = Router();
Auth_route.post("/signin", signin);
Auth_route.post("/login", login);
Auth_route.get("/logout", logout);
export default Auth_route;
