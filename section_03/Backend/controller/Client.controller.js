import mongoose from "mongoose";
import productsModel from "../model/ProductsModel.js";
import mysqlConnection from "../db/mysqlConnection.js";
import { json } from "express";
// import productsModel from "../model/ProductsModel.js";
// const db = mysqlConnection();
export async function getAllProduct(req, res) {
  const result = await productsModel.find({});
  res.json(result);
}
export async function get_cart_handler(req, res) {
  const id = req.body.data;
  const ids = id.map((id) => new mongoose.Types.ObjectId(String(id)));
  const result = await productsModel.find({ _id: { $in: ids } });
  res.status(200).json(result);
}
export async function create_order(req, res) {
  const table_name = "orders";
  const userId = req.cookies._user_id;
  const { totalAmount, productId } = req.body;
  const json_productId = JSON.stringify({
    productID: productId,
  });
  const query = `INSERT INTO ${table_name} (userId,productId,totalAmount)values (?,?,?)`;
  const db = mysqlConnection();
  db.query(
    query,
    [userId, json_productId, totalAmount],
    async (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.status(201).json({
          type: "status",
          message: "Order Created",
        });
      }
    }
  );
}
export async function all_orders(req, res) {
  const db = mysqlConnection();
  const { _user_id } = req.cookies;
  const query = `SELECT orderId FROM orders where userId = ?`;
  db.query(query, [_user_id], async (err, result) => {
    if (err) {
      return res
        .status(404)
        .json({ type: "error", message: "facing some problem in database" });
    } else {
      return res.status(200).json(result);
    }
  });
}
export async function getSingleOrder(req, res) {
  const db = mysqlConnection();
  const table = "orders";
  const id = req.params.id;
  const query = `SELECT * FROM ${table} where orderId = ? `;
  db.query(query, [id], async (err, result) => {
    if (err) {
      return res
        .status(404)
        .json({ type: "error", message: "Some thing wrong the database" });
    } else {
      const { productId, totalAmount } = result[0];
      const json_object = productId.productID.map(
        (id) => new mongoose.Types.ObjectId(String(id))
      );
      const mongoresult = await productsModel.find({
        _id: { $in: json_object },
      });
      const data_to_send = {
        type: "success",
        message: "wait",
        data: {
          totalAmount,
          mongoresult,
        },
      };
      return res.status(200).json(data_to_send);
    }
  });
}
export async function deleteOrder(req, res) {
  const id = Number(req.params.id);
  const db = mysqlConnection();
  const query = "DELETE FROM orders WHERE orderId = ?";
  const allOrder = "SELECT orderId FROM orders WHERE userId = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(404).json({
        type: "error",
        message: "We are facing some error",
      });
    } else {
      const id = Number(req.cookies._user_id);
      db.query(allOrder, [id], (err, result) => {
        if (err) {
          return res.status(404).json({
            type: "error",
            message: "We’re experiencing some issues. Please try again later.",
          });
        } else {
          res.status(200).json({
            type: "success",
            message: "successfully your order",
            data: result,
          });
        }
      });
    }
  });
}
