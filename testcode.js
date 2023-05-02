const express = require("express");
const next = require("next");
const cors = require("cors");
const useragent = require("express-useragent");
const nextI18NextMiddleware = require("next-i18next/middleware").default;
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const nextI18next = require("./i18n");
const mysql = require("mysql2");
const sha256 = require("sha256");
var bodyParser = require("body-parser");
// const helper = require("./src/utils/helper");
var multer = require("multer");
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // console.log(req);
    await cb(null, "./upload/");
  },
  filename: async function (req, file, cb) {
    // console.log(req);
    await cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
var fs = require("fs");
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(req);
    cb(null, "client/files/");
  },
  filename: function (req, file, cb) {
    // console.log(req);
    var a = Date.now();
    // console.log(a)
    cb(null, a + "" + file.originalname);
  },
});
const upload2 = multer({ storage: storage2 }); //add new
// apply them

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ches@ter0",
  database: "hawai",
});

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
let shop_id = 1;
// console.log(request.body);
let date = new Date("2023-04-26T11:08:52.283Z");
let def =
  date.getFullYear() +
  "-" +
  (date.getMonth() + 1 >= 10
    ? date.getMonth() + 1
    : "0" + (date.getMonth() + 1)) +
  "-" +
  date.getDate();
let dateForm = def + " 00:00:00";
let dateTo = def + " 23:59:59";

console.log(dateForm, dateTo);
let qry = `select c.*, (select SUM(cd.price * cd.total) from checkout_detail as cd where cd.checkout_id = c.id and cd.active = true) as price,
(select SUM(cd.total) from checkout_detail as cd where cd.checkout_id = c.id  and cd.active = true) as total from checkout as c
 where created_at BETWEEN ? AND ? and c.active = true`;
let param = [dateForm, dateTo];
if (shop_id) {
  qry += " and c.shop_id = ?";
  param.push(shop_id);
}
connection.query(qry, param, function (err, result, fields) {
  if (!err) {
    console.log(result);
    return response.json({
      success: 1000,
      result: result,
    });
  } else {
    console.log(err);
    return response.status(400).send("statement error");
  }
});
console.log("param", param);
console.log("qry", qry);
