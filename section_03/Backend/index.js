import { config } from "dotenv";
config();
import connectionDb from "./db/mongodbConnection.js";
import cors from "cors";
import express from "express";
import Admin_route from "./routes/Admin.route.js";
import Client_route from "./routes/Client.route.js";
import Auth_route from "./routes/Auth.route.js";
import mysqlConnection from "./db/mysqlConnection.js";
import cookieParser from "cookie-parser";
import Product_inserter from "./db/Product_inserter.js";
const port = process.env.PORT || 5050;
/*
Mongo db connection
 */
connectionDb();
// mysqlConnetion
mysqlConnection();
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(Client_route);
app.use(Admin_route);
app.use(Auth_route);
app.use("/insert/in", Product_inserter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
