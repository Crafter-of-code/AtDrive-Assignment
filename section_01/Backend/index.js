import { config } from "dotenv";
config();
// import connectionDb
import connectionDb from "./db/db.js";
import cors from "cors";
import express from "express";
import Admin_route from "./routes/Admin.route.js";
import Client_route from "./routes/Client.route.js";
const port = process.env.PORT || 5050;
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Admin_route);
connectionDb();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
