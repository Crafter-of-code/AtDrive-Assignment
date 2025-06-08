import bcrypt from "bcrypt";
import mysqlConnection from "../db/mysqlConnection.js";
// import
export async function signin(req, res) {
  const insert_Query = "INSERT INTO USERS (username,password) value (?,?)";
  console.log(req.body);
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
        bcrypt.hash(req.body.user_password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            res.json({
              type: "error",
              message: "we are facing some error in your detail",
            });
          } else {
            console.log(hash);
            const mysqlQuery = mysqlConnection();
            mysqlQuery.query(
              insert_Query,
              [req.body.user_name, hash],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.status(201).json({
                    type: "success",
                    message: "Account Create Successfully",
                  });
                  console.log(result);
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
  const Admin_login_query = "SELECT * FROM Admin WHERE username = ?";
  const client_login_query = "SELECT * FROM Users WHERE username = ?";
  const mysqlQuery = mysqlConnection();
  console.log(req.body);
  if (
    req.body.user_role == "" ||
    req.body.user_name == "" ||
    req.body.user_password == ""
  ) {
    res.status(204).json({ type: "error", message: "Fill all the fields" });
  } else {
    if (req.body.user_role == "admin") {
      const result = mysqlQuery.query(
        Admin_login_query,
        [req.body.user_name],
        (err, result) => {
          console.log(result);
          if (result.length == 0) {
            res.status(404).json({
              type: "error",
              message: "details not found in database",
            });
          } else if (result.length == 1) {
            res
              .status(200)
              .json({ type: "success", message: "Welcome", route: "admin" });
          }
        }
      );
    } else if (req.body.user_role == "client") {
      console.log(req.body.user_name);
      mysqlQuery.query(
        client_login_query,
        [req.body.user_name.trim()],
        (err, result) => {
          if (err) {
            res.json({
              type: "error",
              message: "facing some error for client autheriztion",
            });
          } else {
            if (result.length == 1) {
              res.status(308).json({
                type: "success",
                message: "logged in",
                route: req.body.user_role,
              });
            }
          }
        }
      );
    }
  }
}
