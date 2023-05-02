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
let order_id = 68;
console.log("order_id", order_id);
var sync = true;
var sync1 = true;
var qryOrder =
  "select cd.*, ps.product_id from checkout_detail as cd join product_stock as ps on ps.id = cd.stock_id where cd.checkout_id = ? and cd.active = true";
connection.query(
  qryOrder,
  [order_id],
  function (errOrder, resultOrder, fieldsOrder) {
    if (!errOrder) {
      console.log(resultOrder);
      resultOrder.forEach((e, i) => {
        var qryProduct = `select cd.*,ps.stock_value from checkout_detail as cd join product_stock as ps on ps.id = cd.stock_id
        where ps.product_id =? and active = 1`;
        console.log([e.product_id]);
      });
    } else {
      console.log(errOrder);
    }
  }
);
// console.log("end");
