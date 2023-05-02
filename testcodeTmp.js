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
var item = [
  {
    id: 1,
    name: "marbo",
    price: 250,
    total: 11250,
    count: 30,
  },
  {
    id: 2,
    name: "binjai",
    price: 180,
    total: 1800,
    count: 10,
  },
];
var admin_id = 1;
var remark = "Test";
var shop_id = 1;
console.log("test");

var qryAddOrder = `insert into CHECKOUT (remark,admin_id,shop_id) values (?,?,?);`;
// var qryAddOrder = `select id from checkout where id = 16`;

var sync = true;
var sync1 = true;

connection.query(
  qryAddOrder,
  [remark, admin_id, shop_id],
  // [],
  function (errOrder, resOrder, fieldsOrder) {
    if (!errOrder) {
      order_id = resOrder.insertId;
      //   order_id = resOrder[0].id;
      console.log(order_id);
      item.forEach((ele, index) => {
        console.log(ele.name);
        var count_productstock = `select count(product_id) as count from PRODUCT_STOCK where product_id = ? and stock_value > 0`;
        let count = ele.count;
        // console.log("count", count);
        connection.query(
          count_productstock,
          [ele.id],
          function (errCount, resCount, fieldsCount) {
            if (!errCount) {
              console.log(resCount[0].count);
              for (var i = 0; i < resCount[0].count; i++) {
                var qryStock = `select * from PRODUCT_STOCK where product_id = ? and stock_value > 0
          order by id limit 1 offset ?`;
                connection.query(
                  qryStock,
                  [ele.id, i],
                  function (errStock, resStock, fieldsStock) {
                    // console.log(resStock);
                    if (!errStock) {
                      if (count > resStock[0].stock_value) {
                        // console.log("count", count);

                        count -= resStock[0].stock_value;
                        let stock_value = 0;
                        let stock_id = resStock[0].id;
                        let update_stock = `update PRODUCT_STOCK set stock_value = ? where id = ?`;
                        // let update_stock = `select * from PRODUCT_STOCK where id = ?`;

                        // console.log("stock_id", stock_id);
                        // console.log("update_stock", update_stock);
                        // console.log("stock_value", stock_value);
                        connection.query(
                          update_stock,
                          [stock_value, stock_id],
                          //   [stock_id],
                          function (errUpdateSt, resUpdateSt, fieldUpdateSt) {
                            if (!errUpdateSt) {
                              //   console.log("resUpdateSt", resUpdateSt);
                              //   let insert_checkout = `select * from PRODUCT_STOCK where  id = ?`;
                              //   console.log(
                              //     "order_id",
                              //     order_id,
                              //     "stock_value",
                              //     stock_value,
                              //     "stock_id",
                              //     stock_id,
                              //     "ele.price",
                              //     ele.price
                              //   );
                              let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, stock_id, price) values (?, ?, ?, ?);`;

                              connection.query(
                                insert_checkout,
                                [
                                  order_id,
                                  resStock[0].stock_value,
                                  stock_id,
                                  ele.price,
                                ],
                                // [stock_id],
                                function (
                                  errInsert,
                                  resultInsert,
                                  fieldsInsert
                                ) {
                                  if (!errInsert) {
                                    console.log("insert if");
                                    console.log(
                                      "order_id",
                                      order_id,
                                      "total",
                                      resStock[0].stock_value,
                                      "stock_id",
                                      stock_id,
                                      "ele.price",
                                      ele.price,
                                      "product_name",
                                      ele.name
                                    );
                                  } else {
                                    console.log(errInsert);
                                    return response
                                      .status(400)
                                      .send("statement error");
                                  }
                                }
                              );
                            } else {
                              console.log(errUpdateSt);
                              return response
                                .status(400)
                                .send("statement error");
                            }
                            // console.log(count);
                          }
                        );
                        // console.log("count", count);
                      } else {
                        // console.log("count", count);
                        i = resCount[0].count;
                        let stock_value = resStock[0].stock_value - count;
                        let stock_id = resStock[0].id;
                        let update_stock = `update PRODUCT_STOCK set stock_value = ? where id = ?`;
                        // let update_stock = `select * from PRODUCT_STOCK where id = ?`;

                        // console.log("stock_id", stock_id);
                        // console.log("update_stock", update_stock);
                        // console.log("stock_value", stock_value);
                        connection.query(
                          update_stock,
                          [stock_value, stock_id],
                          //   [stock_id],
                          function (errUpdateSt, resUpdateSt, fieldUpdateSt) {
                            if (!errUpdateSt) {
                              //   console.log("resUpdateSt", resUpdateSt);
                              //   let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, stock_id, price) values (?, ?, ?, ?);`;
                              //   let insert_checkout = `select * from PRODUCT_STOCK where  id = ?`;
                              let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, stock_id, price) values (?, ?, ?, ?);`;

                              connection.query(
                                insert_checkout,
                                [order_id, count, stock_id, ele.price],
                                // [stock_id],
                                function (
                                  errInsert,
                                  resultInsert,
                                  fieldsInsert
                                ) {
                                  if (!errInsert) {
                                    console.log("insert else");
                                    console.log(
                                      "order_id",
                                      order_id,
                                      "total",
                                      count,
                                      "stock_id",
                                      stock_id,
                                      "ele.price",
                                      ele.price,
                                      "product_name",
                                      ele.name
                                    );
                                  } else {
                                    console.log(errInsert);
                                    return response
                                      .status(400)
                                      .send("statement error");
                                  }
                                }
                              );
                            } else {
                              console.log(errUpdateSt);
                              return response
                                .status(400)
                                .send("statement error");
                            }
                            // console.log(count);
                          }
                        );
                        // console.log("<");
                      }
                    } else {
                      console.log(errStock);
                      return response.status(400).send("statement error");
                    }

                    // console.log(count);
                  }
                );
                if (sync1) {
                  require("deasync").sleep(100);
                } else {
                  i++;
                }
              }
            } else {
              console.log(errCount);
              return response.status(400).send("statement error");
            }
          }
        );

        // setTimeout(() => {}, 500);
        if (sync) {
          require("deasync").sleep(100);
        }
      });
    } else {
      console.log(errOrder);
      return response.status(400).send("statement error");
    }
  }
);
// console.log("end");
