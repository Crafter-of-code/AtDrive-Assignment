import jwt from "jsonwebtoken";
export default function cookieChecker(req, res, next) {
  let cookie = "";
  if (req.cookies._admin) {
    cookie = req.cookies._admin;
  } else if (req.cookie._user) {
    cookie = req.cookies._user;
  } else {
    res.statu(200).json({
      type: "error",
      message: "You are unauthorized",
      redirectTo: "/",
    });
    return;
  }
  const Authurizatin_result = jwt.verify(cookie, process.env.JSON_SCRETE_KEY);
  if (Authurizatin_result) {
    next();
  } else {
    res
      .status(200)
      .json({ type: error, message: "You are unthorized", redirectTo: "/" });
  }
}
