import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysqlConnection from "../db/mysqlConnection.js";
import { Router } from "express";
// import
export async function signin(req, res) {
  const user_name = String(req.body.user_name);
  const user_password = String(req.body.user_password);
  const insert_Query = "INSERT INTO users (username,password) value (?,?)";
  if (req.body.user_name == "" || req.body.user_password == "") {
    res.json({ type: "error", message: "Fill all the Fields" });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        res.json({
          type: "error",
          message: "we are facing some error in your detail",
        });
      } else {
        bcrypt.hash(user_password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            res.json({
              type: "error",
              message: "we are facing some error in your detail",
            });
          } else {
            const mysqlQuery = mysqlConnection();
            mysqlQuery.query(
              insert_Query,
              [user_name.toLowerCase(), hash],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.status(201).json({
                    type: "success",
                    message: "Account Create Successfully",
                    redirectTo: "/",
                  });
                }
              }
            );
          }
        });
      }
    });
  }

  // res.json({ type: "error", message: "data recived" });
}
export async function login(req, res) {
  const mysqldb = mysqlConnection();
  const table_name = String(req.body.user_role).toLowerCase();
  const user_name = String(req.body.user_name).toLowerCase();
  const user_password = String(req.body.user_password);
  const query = `SELECT * FROM ${table_name} WHERE username = ?`;
  if (table_name == "" || user_name == "" || user_password == "") {
    res.status(200).json({ type: "error", message: "Fill all the Fields" });
    return;
  } else {
    mysqldb.query(query, [user_name], async (err, db_result) => {
      if (err) {
        console.log(err);
      } else {
        if (db_result.length == 0) {
          res.status(200).json({ type: "error", message: "User not found" });
          return;
        } else {
          if (table_name == "users") {
            const token = jwt.sign(
              { user_name },
              process.env.JSON_SCRETE_KEY,
              {}
            );
            const result = await bcrypt.compare(
              user_password,
              db_result[0].password
            );
            if (result) {
              res
                .cookie("_user", token, {
                  httpOnly: true,
                  sameSite: false,
                  secure: false,
                  path: "/",
                })
                .cookie("_user_id", db_result[0].id)
                .json({
                  id: db_result.id,
                  type: "success",
                  message: "Welcome",
                  redirectTo: "/shop",
                });
              return;
            } else {
              res
                .status(200)
                .json({ type: "error", message: "Wrong Password" });
              return;
            }
          } else if (table_name == "admin") {
            if (user_password == db_result[0].userpassword) {
              const jwt_token = jwt.sign(
                { user_name },
                process.env.JSON_SCRETE_KEY,
                {}
              );
              res.status(200).cookie("_admin", jwt_token).json({
                type: "success",
                message: "Welcome",
                redirectTo: "/admin",
              });

              return;
            } else {
              res
                .status(200)
                .json({ type: "error", message: "Wrong password" });
              return;
            }
          }
        }
      }
    });
  }
}
export async function logout(req, res) {
  res.clearCookie("_admin", { path: "/", httpOnly: true, secure: true });
  res.clearCookie("_user", { path: "/", httpOnly: true, secure: true });
  res.status(200).json({
    type: "success",
    message: "You’re now signed out. See you again soon!",
    redirectTo: "/",
  });
}
