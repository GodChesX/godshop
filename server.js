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
  // host: "localhost",
  // port: 3306,
  // user: "root",
  // password: "Ches@ter0",
  // database: "godshop",
  host: "node45888-godchesxtech.th1.proen.cloud",
  port: 3306,
  user: "root",
  password: "GHOavq32961",
  database: "godshop",
});

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("Connect!!");
// });
// var qry = "SELECT * FROM ADMIN";
// console.log(username, password);
// return return response.redirect('/');
// let user = connection.query(qry, [], function (err, result, fields) {
//   console.log(result);
//   console.log(fields);
// });
app.prepare().then(async () => {
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(useragent.express());

  await nextI18next.initPromise;
  server.use(nextI18NextMiddleware(nextI18next));

  server.use(cors());
  // server.use(i18nextMiddleware.handle(i18next))

  //   server.use(function (req, response, next) {
  //     // res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  //     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //     // response.header('Content-Type', 'application/json; charset=utf-8');

  //     response.header("Access-Control-Allow-Origin", "*");
  //     // response.header('Access-Control-Allow-Credentials', 'true');
  //     // response.header('Access-Control-Allow-Methods', ' POST, GET, OPTIONS');
  //     response.header(
  //       "Access-Control-Allow-Headers",
  //       "Content-Type, Authorization, X-Requested-With,Origin,Accept,Content-Range, Content-  Disposition, Content-Description"
  //     );
  //     // response.header('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  //     next();
  //     // header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-  Disposition, Content-Description');

  //     // header('Access-Control-Allow-Origin: *');
  //     // header("Access-Control-Allow-Credentials: true");
  //     // header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  //     // header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
  //     // header("Content-Type: application/json; charset=utf-8");
  //   });
  //GET
  server.get("/", (req, res) => {
    return app.render(req, res, "/user/login/login", req.query);
  });
  server.get("/home", (req, res) => {
    return app.render(req, res, "/home/home", req.query);
  });
  server.get("/shop/:id", (req, res) => {
    return app.render(req, res, "/user/shop/shop", { id: req.params.id });
  });
  server.get("/shop/:id/product", (req, res) => {
    return app.render(req, res, "/user/shop/product", { id: req.params.id });
  });
  server.get("/shop/:id/order", (req, res) => {
    return app.render(req, res, "/user/shop/order", { id: req.params.id });
  });
  server.get("/shop/:id/history", (req, res) => {
    return app.render(req, res, "/user/shop/history", { id: req.params.id });
  });
  server.get("/shop/:id/history/:order_id", (req, res) => {
    return app.render(req, res, "/user/shop/historyDetail", {
      id: req.params.id,
      order_id: req.params.order_id,
    });
  });
  server.get("/shop/:id/order/:order_id", (req, res) => {
    return app.render(req, res, "/user/shop/orderDetail", {
      id: req.params.id,
      order_id: req.params.order_id,
    });
  });
  server.get("/shop/:id/order/print/:order_id", (req, res) => {
    return app.render(req, res, "/user/shop/printOrder", {
      id: req.params.id,
      order_id: req.params.order_id,
    });
  });
  server.get("/shop/:id/daily-report", (req, res) => {
    return app.render(req, res, "/user/shop/dailyReport", {
      id: req.params.id,
      // order_id: req.params.order_id,
    });
  });
  server.get("/shop/:id/weekly-report", (req, res) => {
    return app.render(req, res, "/user/shop/weeklyReport", {
      id: req.params.id,
      // order_id: req.params.order_id,
    });
  });
  server.get("/shop/:id/monthly-report", (req, res) => {
    return app.render(req, res, "/user/shop/monthlyReport", {
      id: req.params.id,
      // order_id: req.params.order_id,
    });
  });

  server.get("/daily-report", (req, res) => {
    return app.render(req, res, "/home/report/dailyReport", {
      id: req.params.id,
      // order_id: req.params.order_id,
    });
  });
  server.get("/weekly-report", (req, res) => {
    return app.render(req, res, "/home/report/weeklyReport", {
      id: req.params.id,
      // order_id: req.params.order_id,
    });
  });
  server.get("/monthly-report", (req, res) => {
    return app.render(req, res, "/home/report/monthlyReport", {
      id: req.params.id,
      // order_id: req.params.order_id,
    });
  });

  //POST
  server.post("/login", (request, response) => {
    console.log("rere");
    // console.log(request);
    // console.log(request.body);
    var username = request.body.username;
    var password = request.body.password;
    var qry =
      "SELECT a.id,a.username,a.firstname,a.lastname,p.permission_name FROM admin as a join permission as p on p.id = a.permission_id  WHERE username =  ? and password = ?";
    console.log(username, sha256(password));
    // return return response.redirect('/');
    connection.query(
      qry,
      [username, sha256(password)],
      function (err, result, fields) {
        console.log(err);
        if (result.length > 0) {
          return response.json({ success: 1000, result: result[0] });
        } else {
          return response.status(400).send("not found user");
        }
        // console.log(fields)
      }
    );
  });

  server.post("/getShop", (request, response) => {
    var id = request.body.id;
    var qry = `select s.* from shop as s join permission_shop as ps on ps.shop_id = s.id 
      join admin as a on ps.permission_id = a.permission_id
      where a.id = ?`;
    // return return response.redirect('/');
    connection.query(qry, [id], function (err, result, fields) {
      console.log(err);
      if (result.length > 0) {
        return response.json({ success: 1000, result: result });
      } else {
        return response.status(400).send("not found user");
      }
      // console.log(fields)
    });
  });

  server.post("/getPermission", (request, response) => {
    var shop_id = request.body.shop_id;
    var admin_id = request.body.admin_id;

    var qry = ` select s.* from shop as s join permission_shop as ps on ps.shop_id = s.id 
    join admin as a on ps.permission_id = a.permission_id
    where a.id = ? and s.id = ?`;
    // return return response.redirect('/');
    connection.query(qry, [admin_id, shop_id], function (err, result, fields) {
      //   console.log(result);
      if (result.length > 0) {
        return response.json({ success: 1000, result: result[0] });
      } else {
        return response.status(400).send("don't have permission");
      }
      // console.log(fields)
    });
  });

  server.post("/getProduct", (request, response) => {
    var id = request.body.id;
    var in_stock = request.body.in_stock;
    var qry = `select p.*, SUM(ps.stock_value) as stock from product as p join product_stock as ps on ps.product_id = p.id
    where p.shop_id = ? and p.active = true  group by ps.product_id HAVING stock > ?`;
    // return return response.redirect('/');
    connection.query(
      qry,
      [id, in_stock ? 0 : -1],
      function (err, result, fields) {
        console.log(result);
        var sync = true;
        var qryProductPrice =
          "select * from product_price where product_id = ? and active = true";
        result.forEach((ele, index) => {
          connection.query(
            qryProductPrice,
            [ele.id],
            function (err1, result1, fields1) {
              // console.log(ele.total, ele.stock_id);
              if (!err1) {
                ele.price = result1;
              } else {
                return response.status(400).send("statement error");
              }
            }
          );
          if (sync) {
            require("deasync").sleep(100);
          }
        });
        // if (result.length > 0) {
        return response.json({ success: 1000, result: result });
        // } else {
        //   return response.status(400).send("not found user");
        // }
        // console.log(fields)
      }
    );
  });

  server.post("/addNewProduct", upload.single("image"), (request, response) => {
    console.log(request.body);
    let custom_price = null;
    if (request.body.custom_price) {
      custom_price = JSON.parse(request.body.custom_price);
    }
    console.log(custom_price);
    // return "hello";
    let originalname = null;
    if (typeof request.file?.originalname != "undefined") {
      originalname = request.file.originalname.split(".");
    }
    if (originalname) {
      let date = new Date();
      var fileName = date.getFullYear() + date.getMonth() + makeid(24);
      // console.log("./public/image/product/" + request.body.image);
      var pathFile =
        "./public/image/product/" + fileName + "." + originalname[1];
      fs.rename("./upload/" + request.file.originalname, pathFile, (err) => {
        if (err) {
          console.log(err);
          //   response.json({ msg: err, success: false });
        }
        let product_name = request.body.name;
        let shop_id = request.body.shop_id;
        let price = request.body.price;
        var qry = `insert into product (product_name,product_image,shop_id) values (?,?,?);`;
        // // return return response.redirect('/');
        connection.query(
          qry,
          [product_name, fileName + "." + originalname[1], shop_id],
          function (err, result, fields) {
            // console.log(result.insertId);
            if (!err) {
              let stock_price = request.body.stock_price;
              let stock_value = request.body.stock_value;
              let admin_id = request.body.admin_id;
              var qryStock = `insert into product_stock (product_id, stock_price, stock_in, stock_value,admin_id) values (?, ?, ?, ?, ?)`;
              connection.query(
                qryStock,
                [
                  result.insertId,
                  stock_price,
                  stock_value,
                  stock_value,
                  admin_id,
                ],
                function (err, results, fields) {
                  // console.log(result.insertId);

                  if (!err) {
                    var qryProductPrice = `insert into product_price (product_id,price,amount) value (?,?,?)`;
                    connection.query(
                      qryProductPrice,
                      [result.insertId, price, 1],
                      function (
                        errProductPrice,
                        resultProductPrice,
                        fieldProductPrice
                      ) {
                        if (!errProductPrice) {
                          if (custom_price && custom_price.length > 0) {
                            var sync = true;
                            custom_price.forEach((ele, index) => {
                              connection.query(
                                qryProductPrice,
                                [result.insertId, ele.price, ele.amount],
                                function (err1, result1, fields1) {
                                  console.log(ele.total, ele.stock_id);
                                  if (!err1) {
                                  } else {
                                    return response
                                      .status(400)
                                      .send("statement error");
                                  }
                                }
                              );
                              if (sync) {
                                require("deasync").sleep(100);
                              }
                            });
                            return response.json({
                              success: 1000,
                              description: "เพิ่มสินค้าเสร็จสิ้น",
                            });
                          }
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      });
    } else {
      let product_name = request.body.name;
      let shop_id = request.body.shop_id;
      let price = request.body.price;
      var qry = `insert into product (product_name,shop_id) values (?,?);`;
      // // return return response.redirect('/');
      connection.query(
        qry,
        [product_name, shop_id],
        function (err, result, fields) {
          console.log(result.insertId);
          if (!err) {
            let stock_price = request.body.stock_price;
            let stock_value = request.body.stock_value;
            let admin_id = request.body.admin_id;
            var qryStock = `insert into product_stock (product_id, stock_price, stock_in, stock_value,admin_id) values (?, ?, ?, ?, ?)`;
            connection.query(
              qryStock,
              [
                result.insertId,
                stock_price,
                stock_value,
                stock_value,
                admin_id,
              ],
              function (err, results, fields) {
                // console.log(result.insertId);

                if (!err) {
                  var qryProductPrice = `insert into product_price (product_id,price,amount) value (?,?,?)`;
                  connection.query(
                    qryProductPrice,
                    [result.insertId, price, 1],
                    function (
                      errProductPrice,
                      resultProductPrice,
                      fieldProductPrice
                    ) {
                      if (!errProductPrice) {
                        if (custom_price && custom_price.length > 0) {
                          var sync = true;
                          custom_price.forEach((ele, index) => {
                            connection.query(
                              qryProductPrice,
                              [result.insertId, ele.price, ele.amount],
                              function (err1, result1, fields1) {
                                console.log(ele.total, ele.stock_id);
                                if (!err1) {
                                } else {
                                  return response
                                    .status(400)
                                    .send("statement error");
                                }
                              }
                            );
                            if (sync) {
                              require("deasync").sleep(100);
                            }
                          });
                          return response.json({
                            success: 1000,
                            description: "เพิ่มสินค้าเสร็จสิ้น",
                          });
                        }
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
    return response.json({
      success: 1000,
      description: "เพิ่มสินค้าเสร็จสิ้น",
    });
    // console.log(originalname);
  });

  server.post("/editProduct", upload.single("image"), (request, response) => {
    console.log(request.body);
    let custom_price = null;
    if (request.body.custom_price) {
      custom_price = JSON.parse(request.body.custom_price);
    }
    // console.log("custom_price", custom_price);
    let originalname = null;
    if (typeof request.file?.originalname != "undefined") {
      originalname = request.file.originalname.split(".");
    }

    if (originalname) {
      let originalname = request.file.originalname.split(".");
      // console.log(originalname);
      let date = new Date();
      var fileName = date.getFullYear() + date.getMonth() + makeid(24);
      // console.log("./public/image/product/" + request.body.image);
      var pathFile =
        "./public/image/product/" + fileName + "." + originalname[1];
      fs.rename("./upload/" + request.file.originalname, pathFile, (err) => {
        if (err) {
          console.log(err);
          //   response.json({ msg: err, success: false });
        }
        let product_name = request.body.name;
        let product_id = request.body.product_id;
        // let price = request.body.price;
        var qry = `UPDATE product SET product_name = ?,product_image = ? WHERE id = ?`;
        // // return return response.redirect('/');
        connection.query(
          qry,
          [product_name, fileName + "." + originalname[1], product_id],
          function (err, result, fields) {
            console.log(result.insertId);
            if (!err) {
              let qryUpdateActive =
                "UPDATE product_price SET active = false WHERE product_id = ?";
              connection.query(
                qryUpdateActive,
                [product_id],
                function (err1, result1, fields1) {
                  // console.log(ele.total, ele.stock_id);
                  if (!err1) {
                    let sync = true;
                    custom_price.forEach((element) => {
                      if (element.id) {
                        let qryUpdate =
                          "UPDATE product_price SET amount = ?,price = ?,active = true WHERE id = ?";
                        connection.query(
                          qryUpdate,
                          [element.amount, element.price, element.id],
                          function (err1, result1, fields1) {
                            // console.log(ele.total, ele.stock_id);/
                            if (!err1) {
                            } else {
                              return response
                                .status(400)
                                .send("statement error");
                            }
                          }
                        );
                      } else {
                        let qryUpdate =
                          "insert into product_price (product_id,price,amount) value (?,?,?)";
                        connection.query(
                          qryUpdate,
                          [product_id, element.price, element.amount],
                          function (err1, result1, fields1) {
                            // console.log(ele.total, ele.stock_id);
                            if (!err1) {
                            } else {
                              return response
                                .status(400)
                                .send("statement error");
                            }
                          }
                        );
                      }
                      if (sync) {
                        require("deasync").sleep(100);
                      }
                    });
                    return response.json({
                      success: 1000,
                      description: "แก้ไขสินค้าเสร็จสิ้น",
                    });
                  } else {
                    return response.status(400).send("statement error");
                  }
                }
              );
            }
            //   if (result.length > 0) {
            //     return response.json({ success: 1000, result: result });
            //   } else {
            //     return response.status(400).send("not found user");
            //   }
            // console.log(fields)
          }
        );
        // return response.json({
        //   success: 1000,
        //   result: "./public/image/product/" + fileName + "." + originalname[1],
        // });
        // response.end();
      });
    } else {
      let product_name = request.body.name;
      let product_id = request.body.product_id;
      var qry = `UPDATE product SET product_name = ? WHERE id = ?`;
      // // return return response.redirect('/');
      connection.query(
        qry,
        [product_name, product_id],
        function (err, result, fields) {
          console.log(product_id);
          if (!err) {
            let qryUpdateActive =
              "UPDATE product_price SET active = false WHERE product_id = ?";
            connection.query(
              qryUpdateActive,
              [product_id],
              function (err1, result1, fields1) {
                // console.log(ele.total, ele.stock_id);
                if (!err1) {
                  let sync = true;
                  custom_price.forEach((element) => {
                    if (element.id) {
                      let qryUpdate =
                        "UPDATE product_price SET amount = ?,price = ?,active = true WHERE id = ?";
                      connection.query(
                        qryUpdate,
                        [element.amount, element.price, element.id],
                        function (err1, result1, fields1) {
                          // console.log(ele.total, ele.stock_id);
                          if (!err1) {
                          } else {
                            return response.status(400).send("statement error");
                          }
                        }
                      );
                    } else {
                      let qryUpdate =
                        "insert into product_price (product_id,price,amount) value (?,?,?)";
                      connection.query(
                        qryUpdate,
                        [product_id, element.price, element.amount],
                        function (err1, result1, fields1) {
                          // console.log(ele.total, ele.stock_id);
                          if (!err1) {
                          } else {
                            return response.status(400).send("statement error");
                          }
                        }
                      );
                    }
                    if (sync) {
                      require("deasync").sleep(100);
                    }
                  });
                  return response.json({
                    success: 1000,
                    description: "เพิ่มสินค้าเสร็จสิ้น",
                  });
                } else {
                  return response.status(400).send("statement error");
                }
              }
            );

            // if (!err) {
            //   return response.json({
            //     success: 1000,
            //     description: "แก้ไขสินค้าเสร็จสิ้น",
            //   });
            // }
          }
          //   if (result.length > 0) {
          //     return response.json({ success: 1000, result: result });
          //   } else {
          //     return response.status(400).send("not found user");
          //   }
          // console.log(fields)
        }
      );
    }
  });

  server.post(
    "/editProductWithImage",
    upload.single("image"),
    (request, response) => {
      console.log(request.body);
      if (request.body.custom_price) {
        custom_price = JSON.parse(request.body.custom_price);
      }
      console.log("custom_price", custom_price);
      return "eiei";
      // console.log(request.body);
      let originalname = request.file.originalname.split(".");
      // console.log(originalname);
      let date = new Date();
      var fileName = date.getFullYear() + date.getMonth() + makeid(24);
      // console.log("./public/image/product/" + request.body.image);
      var pathFile =
        "./public/image/product/" + fileName + "." + originalname[1];
      fs.rename("./upload/" + request.file.originalname, pathFile, (err) => {
        if (err) {
          console.log(err);
          //   response.json({ msg: err, success: false });
        }
        let product_name = request.body.name;
        let product_id = request.body.product_id;
        let price = request.body.price;
        var qry = `UPDATE product SET product_name = ?,price = ?,product_image = ? WHERE id = ?`;
        // // return return response.redirect('/');
        connection.query(
          qry,
          [product_name, price, fileName + "." + originalname[1], product_id],
          function (err, result, fields) {
            console.log(result.insertId);
            if (!err) {
              if (!err) {
                return response.json({
                  success: 1000,
                  description: "แก้ไขสินค้าเสร็จสิ้น",
                });
              }
            }
            //   if (result.length > 0) {
            //     return response.json({ success: 1000, result: result });
            //   } else {
            //     return response.status(400).send("not found user");
            //   }
            // console.log(fields)
          }
        );
        // return response.json({
        //   success: 1000,
        //   result: "./public/image/product/" + fileName + "." + originalname[1],
        // });

        // response.end();
      });
    }
  );

  server.post("/addStock", upload.single("image"), (request, response) => {
    let stock_price = request.body.stock_price;
    let stock_value = request.body.stock_value;
    let admin_id = request.body.admin_id;
    let product_id = request.body.product_id;
    var qryStock = `insert into product_stock (product_id, stock_price, stock_in, stock_value,admin_id) values (?, ?, ?, ?, ?)`;
    connection.query(
      qryStock,
      [product_id, stock_price, stock_value, stock_value, admin_id],
      function (err, results, fields) {
        // console.log(result.insertId);
        if (!err) {
          return response.json({
            success: 1000,
            description: "เพิ่มสินค้าเสร็ขสิ้น",
          });
        }
      }
    );
  });
  server.post("/getOrder", (request, response) => {
    let shop_id = request.body.shop_id;
    let history = request.body.history ?? false;

    console.log(shop_id);
    var qry = `select c.*,CONCAT(a.firstname, " " ,a.lastname) as admin_name, (select SUM(cd.price * cd.count) from checkout_detail as cd where cd.checkout_id = c.id and cd.active = true) as price ,
    (select SUM(cd.count) from checkout_detail as cd where cd.checkout_id = c.id  and cd.active = true) as total 
    from checkout as c
    join admin as a on a.id = c.admin_id
     where c.shop_id = ? and c.active = true and c.payment = ?`;
    connection.query(qry, [shop_id, history], function (err, result, fields) {
      //   console.log(result);
      if (!err) {
        // console.log(result);
        var column = [
          {
            name: "วันเวลาที่สร้างรายการ",
            show: true,
            field: "created_at",
            type: "datetime",
          },
          { name: "หมายเหตุ", show: true, field: "remark", type: "str" },
          {
            name: "ผู้สร้างรายการ",
            show: true,
            field: "admin_name",
            type: "str",
          },
          { name: "ราคา (บาท)", show: true, field: "price", type: "int" },
          {
            name: "จำนวนสินค้า (ชิ้น)",
            show: true,
            field: "total",
            type: "int",
          },
        ];
        return response.json({
          success: 1000,
          result: { column: column, data: result },
        });
      } else {
        return response.status(400).send("statement error");
      }
    });
  });
  server.post("/getOrderDetail", (request, response) => {
    let order_id = request.body.order_id;
    // console.log(order_id);
    var qry = `select c.*,CONCAT(a.firstname, " " ,a.lastname) as admin_name, (select SUM(cd.price * cd.count) from checkout_detail as cd where cd.checkout_id = c.id and cd.active = true) as price,
    (select SUM(cd.count) from checkout_detail as cd where cd.checkout_id = c.id  and cd.active = true) as total from checkout as c
    join admin as a on a.id = c.admin_id
     where c.id = ? and c.active = true and c.payment = false`;
    connection.query(qry, [order_id], function (err, result, fields) {
      //   console.log(result);
      if (!err) {
        // console.log(result);
        if (result.length > 0) {
          var qry1 = `
          select cd.id,cd.checkout_id,sum(cd.count) as total,p.product_name, p.product_image,p.id as product_id, cd.price from checkout_detail as cd 
          join product_price as pp on pp.id = cd.price_id 
          join product as p on p.id = pp.product_id
          where cd.checkout_id = ? and cd.active = true
          group by cd.id;`;
          connection.query(qry1, [order_id], function (err, result1, fields) {
            //   console.log(result);
            if (!err) {
              // console.log(result);
              var column = [
                //   {
                //     name: "วันเวลาที่สร้างรายการ",
                //     show: true,
                //     field: "created_at",
                //     type: "datetime",
                //   },
                {
                  name: "ชื่อสินค้า",
                  show: true,
                  field: "product_name",
                  type: "str",
                },
                {
                  name: "รูปภาพ",
                  show: true,
                  field: "product_image",
                  type: "image",
                },
                { name: "ราคา (บาท)", show: true, field: "price", type: "int" },
                {
                  name: "จำนวนสินค้า (ชิ้น)",
                  show: true,
                  field: "total",
                  type: "int",
                },
                {
                  name: "ราคาทั้งหมด",
                  show: true,
                  field: "total_price",
                  type: "int",
                },
              ];
              let res = result1.map((e, ind) => {
                e.total_price = e.price * e.total;
                return e;
              });
              return response.json({
                success: 1000,
                result: {
                  order: result[0],
                  order_data: { column: column, data: res },
                },
              });
            } else {
              console.log(err);
              return response.status(400).send("statement error");
            }
          });
        } else {
          return response.status(400).send("ไม่พบรายการหรือถูกลบไปแล้ว");
        }
      } else {
        console.log(err);
        return response.status(400).send("statement error");
      }
    });
  });

  server.post("/deleteProductHard", (request, response) => {
    let product_id = request.body.product_id;
    console.log("product_id", product_id);
    var qry = `DELETE FROM product_stock WHERE product_id = ?`;
    connection.query(qry, [product_id], function (err, result, fields) {
      console.log(result, err);
      if (!err) {
        // console.log(result);
        var qryProduct = `DELETE FROM product WHERE id = ?`;
        connection.query(
          qryProduct,
          [product_id],
          function (err, result, fields) {
            if (!err) {
              return response.json({
                success: 1000,
                description: "ลบสินค้าเสร็จสิ้น",
              });
            } else {
              return response.status(400).send("statement error");
            }
          }
        );
      } else {
        return response.status(400).send("statement error");
      }
    });
  });

  server.post("/deleteProduct", (request, response) => {
    let product_id = request.body.product_id;
    console.log("product_id", product_id);
    var qryProduct = `UPDATE product SET active = false WHERE id = ?`;
    connection.query(qryProduct, [product_id], function (err, result, fields) {
      if (!err) {
        return response.json({
          success: 1000,
          description: "ลบสินค้าเสร็จสิ้น",
        });
      } else {
        return response.status(400).send("statement error");
      }
    });
  });

  //   server.post("/removeOrderProduct", (request, response) => {
  //     let checkout_detail_id = request.body.checkout_detail_id;
  //     // console.log("product_id", product_id);
  //     var qryProduct = `UPDATE checkout_detail SET active = false WHERE id = ?`;
  //     connection.query(
  //       qryProduct,
  //       [checkout_detail_id],
  //       function (err, result, fields) {
  //         if (!err) {
  //           return response.json({
  //             success: 1000,
  //             description: "ลบสินค้าเสร็จสิ้น",
  //           });
  //         } else {
  //           return response.status(400).send("statement error");
  //         }
  //       }
  //     );
  //   });
  server.post("/removeOrderProduct", (request, response) => {
    let checkout_detail_id = request.body.id;
    let order_id = request.body.order_id;
    console.log(request.body);
    // return;
    // console.log("product_id", product_id);
    var sync = true;
    var qryProduct = `SELECT cds.*,ps.stock_value FROM checkout_detail_stock as cds join product_stock as ps on ps.id = cds.stock_id where checkout_detail_id =  ?`;
    connection.query(
      qryProduct,
      [checkout_detail_id],
      function (err, result, fields) {
        if (!err) {
          console.log(result);
          result.forEach((ele, index) => {
            var returnStock = `update product_stock set stock_value = ? where id = ?`;
            connection.query(
              returnStock,
              [ele.total + ele.stock_value, ele.stock_id],
              function (err1, result1, fields1) {
                console.log(ele.total, ele.stock_id);
                if (!err1) {
                  var cd_active = `UPDATE checkout_detail SET active = false WHERE id = ?`;
                  connection.query(
                    cd_active,
                    [checkout_detail_id],
                    function (err2, result2, fields2) {
                      // console.log(ele.id);
                      if (!err2) {
                      } else {
                        return response.status(400).send("statement error");
                      }
                    }
                  );
                } else {
                  return response.status(400).send("statement error");
                }
              }
            );
            if (sync) {
              require("deasync").sleep(100);
            }
          });
        } else {
          return response.status(400).send("statement error");
        }
      }
    );
    setTimeout(() => {
      return response.json({
        success: 1500,
        description: "ลบรายการเสร็จสิ้น",
      });
    }, 1500);
  });

  server.post("/addItem", async (request, response) => {
    let order_id = request.body.order_id;
    let item = request.body.item;
    console.log(item);
    // let id = [1, 2];
    var sync = true;
    var sync1 = true;

    item.forEach((ele, index) => {
      console.log(ele.name);
      let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, price, count, price_id) values (?, ?, ?, ?, ?);`;
      connection.query(
        insert_checkout,
        [
          order_id,
          ele.count * ele.amount,
          // stock_id,
          ele.price,
          ele.count,
          ele.price_id,
        ],
        // [stock_id],
        function (errInsert, resultInsert, fieldsInsert) {
          if (!errInsert) {
            let checkout_id = resultInsert.insertId;
            var qryStock = `select * from product_stock where product_id = ? and stock_value > 0
            order by id`;
            let count = ele.count * ele.amount;
            connection.query(
              qryStock,
              [ele.id],
              function (errStock, resStock, fieldStock) {
                if (!errStock) {
                  console.log(resStock);

                  resStock.forEach((e, i) => {
                    if (count > e.stock_value) {
                      console.log(count, e.stock_value);
                      // console.log("count", count);
                      count = count - e.stock_value;
                      let stock_value = 0;
                      let stock_id = e.id;
                      let update_stock = `update product_stock set stock_value = ? where id = ?`;
                      // let update_stock = `select * from product_stock where id = ?`;

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
                            //   let insert_checkout = `select * from product_stock where  id = ?`;
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
                            let qryCDS = `insert into checkout_detail_stock (checkout_detail_id, stock_id,total)
                                 value (?,?,?)`;
                            console.log(
                              "before insert checkout_detail_stock count = ",
                              count
                            );
                            // let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, price, count, product_price_id) values (?, ?, ?, ?, ?, ?);`;
                            connection.query(
                              qryCDS,
                              [checkout_id, stock_id, e.stock_value],
                              // [stock_id],
                              function (errInsert, resultInsert, fieldsInsert) {
                                if (!errInsert) {
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
                            return response.status(400).send("statement error");
                          }
                          // console.log(count);
                        }
                      );
                      // count -= e.stock_value;
                      // let stock_value = 0;
                      // let stock_id = e.id;
                      // // console.log(count);
                      // console.log("count -= e.stock_value", count);
                    } else if (count > 0) {
                      console.log(count, e.stock_value);
                      let stock_value = e.stock_value - count;
                      let stock_id = e.id;
                      let update_stock = `update product_stock set stock_value = ? where id = ?`;
                      // let update_stock = `select * from product_stock where id = ?`;

                      // console.log("stock_id", stock_id);
                      // console.log("update_stock", update_stock);
                      // console.log("stock_value", stock_value);
                      connection.query(
                        update_stock,
                        [stock_value, stock_id],
                        //   [stock_id],
                        function (errUpdateSt, resUpdateSt, fieldUpdateSt) {
                          if (!errUpdateSt) {
                            let qryCDS = `insert into checkout_detail_stock (checkout_detail_id, stock_id,total)
                                 value (?,?,?)`;
                            // let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, price, count, product_price_id) values (?, ?, ?, ?, ?, ?);`;
                            connection.query(
                              qryCDS,
                              [checkout_id, stock_id, count],
                              // [stock_id],
                              function (errInsert, resultInsert, fieldsInsert) {
                                if (!errInsert) {
                                } else {
                                  console.log(errInsert);
                                  return response
                                    .status(400)
                                    .send("statement error");
                                }
                              }
                            );
                            //   console.log("resUpdateSt", resUpdateSt);
                            //   let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, stock_id, price) values (?, ?, ?, ?);`;
                            //   let insert_checkout = `select * from product_stock where  id = ?`;
                            // let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, stock_id, price, amount, product_price_id) values (?, ?, ?, ?, ?, ?);`;
                            // connection.query(
                            //   insert_checkout,
                            //   [
                            //     order_id,
                            //     count,
                            //     stock_id,
                            //     ele.price,
                            //     ele.count,
                            //     ele.price_id,
                            //   ],
                            //   // [stock_id],
                            //   function (errInsert, resultInsert, fieldsInsert) {
                            //     if (!errInsert) {
                            //       console.log("insert else");
                            //       console.log(
                            //         "order_id",
                            //         order_id,
                            //         "total",
                            //         count,
                            //         "stock_id",
                            //         stock_id,
                            //         "ele.price",
                            //         ele.price,
                            //         "product_name",
                            //         ele.name
                            //       );
                            //       count = 0;
                            //     } else {
                            //       console.log(errInsert);
                            //       return response
                            //         .status(400)
                            //         .send("statement error");
                            //     }
                            //   }
                            // );
                          } else {
                            console.log(errUpdateSt);
                            return response.status(400).send("statement error");
                          }
                          // console.log(count);
                        }
                      );
                      // count = 0;
                    } else {
                      console.log("end");
                    }
                    if (sync1) {
                      require("deasync").sleep(100);
                    }
                  });
                } else {
                  console.log(errStock);
                  return response.status(400).send("statement error");
                }
                // console.log(count);
              }
            );
          } else {
            console.log(errInsert);
            return response.status(400).send("statement error");
          }
        }
      );

      // setTimeout(() => {}, 500);
      if (sync) {
        require("deasync").sleep(100);
      }
    });
    // console.log(res);
    // id.forEach(async (e) => {

    // });
    console.log("here");
    setTimeout(() => {
      return response.json({
        success: 1000,
        description: "เพิ่มรายการแล้ว",
      });
    }, 1500);
  });

  server.post("/addNewOrder", async (request, response) => {
    let remark = request.body.remark;
    let admin_id = request.body.admin_id;
    let item = request.body.item;
    let shop_id = request.body.shop_id;
    console.log(item);
    // console.log(item);
    // item.forEach((ele, index) => {
    //   console.log("amount,", ele.amount);
    //   console.log("price_id,", ele.price_id);
    // });
    // return;
    var qryAddOrder = `insert into CHECKOUT (remark,admin_id,shop_id) values (?,?,?);`;
    // var qryAddOrder = `select id from checkout where id = 40`;

    var sync = true;
    var sync1 = true;

    connection.query(
      qryAddOrder,
      [remark, admin_id, shop_id],
      // [],
      function (errOrder, resOrder, fieldsOrder) {
        if (!errOrder) {
          order_id = resOrder.insertId;
          // order_id = resOrder[0].id;
          console.log(order_id);
          item.forEach((ele, index) => {
            console.log(ele.name);
            let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, price, count, price_id) values (?, ?, ?, ?, ?);`;
            connection.query(
              insert_checkout,
              [
                order_id,
                ele.count * ele.amount,
                // stock_id,
                ele.price,
                ele.count,
                ele.price_id,
              ],
              // [stock_id],
              function (errInsert, resultInsert, fieldsInsert) {
                if (!errInsert) {
                  let checkout_id = resultInsert.insertId;
                  var qryStock = `select * from product_stock where product_id = ? and stock_value > 0
                  order by id`;
                  let count = ele.count * ele.amount;
                  connection.query(
                    qryStock,
                    [ele.id],
                    function (errStock, resStock, fieldStock) {
                      if (!errStock) {
                        console.log(resStock);

                        resStock.forEach((e, i) => {
                          if (count > e.stock_value) {
                            console.log(count, e.stock_value);
                            // console.log("count", count);
                            count = count - e.stock_value;
                            let stock_value = 0;
                            let stock_id = e.id;
                            let update_stock = `update product_stock set stock_value = ? where id = ?`;
                            // let update_stock = `select * from product_stock where id = ?`;

                            // console.log("stock_id", stock_id);
                            // console.log("update_stock", update_stock);
                            // console.log("stock_value", stock_value);
                            connection.query(
                              update_stock,
                              [stock_value, stock_id],
                              //   [stock_id],
                              function (
                                errUpdateSt,
                                resUpdateSt,
                                fieldUpdateSt
                              ) {
                                if (!errUpdateSt) {
                                  //   console.log("resUpdateSt", resUpdateSt);
                                  //   let insert_checkout = `select * from product_stock where  id = ?`;
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
                                  let qryCDS = `insert into checkout_detail_stock (checkout_detail_id, stock_id,total)
                                       value (?,?,?)`;
                                  console.log(
                                    "before insert checkout_detail_stock count = ",
                                    count
                                  );
                                  // let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, price, count, product_price_id) values (?, ?, ?, ?, ?, ?);`;
                                  connection.query(
                                    qryCDS,
                                    [checkout_id, stock_id, e.stock_value],
                                    // [stock_id],
                                    function (
                                      errInsert,
                                      resultInsert,
                                      fieldsInsert
                                    ) {
                                      if (!errInsert) {
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
                            // count -= e.stock_value;
                            // let stock_value = 0;
                            // let stock_id = e.id;
                            // // console.log(count);
                            // console.log("count -= e.stock_value", count);
                          } else if (count > 0) {
                            console.log(count, e.stock_value);
                            let stock_value = e.stock_value - count;
                            let stock_id = e.id;
                            let update_stock = `update product_stock set stock_value = ? where id = ?`;
                            // let update_stock = `select * from product_stock where id = ?`;

                            // console.log("stock_id", stock_id);
                            // console.log("update_stock", update_stock);
                            // console.log("stock_value", stock_value);
                            connection.query(
                              update_stock,
                              [stock_value, stock_id],
                              //   [stock_id],
                              function (
                                errUpdateSt,
                                resUpdateSt,
                                fieldUpdateSt
                              ) {
                                if (!errUpdateSt) {
                                  let qryCDS = `insert into checkout_detail_stock (checkout_detail_id, stock_id,total)
                                       value (?,?,?)`;
                                  // let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, price, count, product_price_id) values (?, ?, ?, ?, ?, ?);`;
                                  connection.query(
                                    qryCDS,
                                    [checkout_id, stock_id, count],
                                    // [stock_id],
                                    function (
                                      errInsert,
                                      resultInsert,
                                      fieldsInsert
                                    ) {
                                      if (!errInsert) {
                                      } else {
                                        console.log(errInsert);
                                        return response
                                          .status(400)
                                          .send("statement error");
                                      }
                                    }
                                  );
                                  //   console.log("resUpdateSt", resUpdateSt);
                                  //   let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, stock_id, price) values (?, ?, ?, ?);`;
                                  //   let insert_checkout = `select * from product_stock where  id = ?`;
                                  // let insert_checkout = `insert into CHECKOUT_DETAIL (checkout_id, total, stock_id, price, amount, product_price_id) values (?, ?, ?, ?, ?, ?);`;
                                  // connection.query(
                                  //   insert_checkout,
                                  //   [
                                  //     order_id,
                                  //     count,
                                  //     stock_id,
                                  //     ele.price,
                                  //     ele.count,
                                  //     ele.price_id,
                                  //   ],
                                  //   // [stock_id],
                                  //   function (errInsert, resultInsert, fieldsInsert) {
                                  //     if (!errInsert) {
                                  //       console.log("insert else");
                                  //       console.log(
                                  //         "order_id",
                                  //         order_id,
                                  //         "total",
                                  //         count,
                                  //         "stock_id",
                                  //         stock_id,
                                  //         "ele.price",
                                  //         ele.price,
                                  //         "product_name",
                                  //         ele.name
                                  //       );
                                  //       count = 0;
                                  //     } else {
                                  //       console.log(errInsert);
                                  //       return response
                                  //         .status(400)
                                  //         .send("statement error");
                                  //     }
                                  //   }
                                  // );
                                } else {
                                  console.log(errUpdateSt);
                                  return response
                                    .status(400)
                                    .send("statement error");
                                }
                                // console.log(count);
                              }
                            );
                            // count = 0;
                          } else {
                            console.log("end");
                          }
                          if (sync1) {
                            require("deasync").sleep(100);
                          }
                        });
                      } else {
                        console.log(errStock);
                        return response.status(400).send("statement error");
                      }
                      // console.log(count);
                    }
                  );
                } else {
                  console.log(errInsert);
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
    console.log("here");
    setTimeout(() => {
      return response.json({
        success: 1000,
        description: "เพิ่มรายการแล้ว",
      });
    }, 1500);
  });
  server.post("/deleteOrder", (request, response) => {
    let order_id = request.body.order_id;
    console.log("order_id", order_id);
    var sync = true;
    var sync1 = true;
    var qryOrder =
      "select distinct(ps.product_id) from checkout_detail as cd join product_stock as ps on ps.id = cd.stock_id where cd.checkout_id = ? and cd.active = true";
    connection.query(
      qryOrder,
      [order_id],
      function (errOrder, resultOrder, fieldsOrder) {
        if (!errOrder) {
          console.log(resultOrder);
          var qrySetActive = "UPDATE checkout SET active = false WHERE id = ?";
          connection.query(
            qrySetActive,
            [order_id],
            function (errActive, resultActive, fieldsOrder) {
              if (!errActive) {
                resultOrder.forEach((e, i) => {
                  var qryProduct = `select cd.*,ps.stock_value from checkout_detail as cd join product_stock as ps on ps.id = cd.stock_id
                where ps.product_id =? and active = 1 and cd.checkout_id = ?`;
                  connection.query(
                    qryProduct,
                    [e.product_id, order_id],
                    function (err, result, fields) {
                      if (!err) {
                        console.log("result qryProduct", result);
                        result.forEach((ele, index) => {
                          var returnStock = `update product_stock set stock_value = ? where id = ?`;
                          connection.query(
                            returnStock,
                            [ele.total + ele.stock_value, ele.stock_id],
                            function (err1, result1, fields1) {
                              console.log(ele.total, ele.stock_id);
                              if (!err1) {
                                var cd_active = `UPDATE checkout_detail SET active = false WHERE id = ?`;
                                connection.query(
                                  cd_active,
                                  [ele.id],
                                  function (err2, result2, fields2) {
                                    console.log(ele.id);
                                    if (!err2) {
                                    } else {
                                      return response
                                        .status(400)
                                        .send("statement error");
                                    }
                                  }
                                );
                              } else {
                                return response
                                  .status(400)
                                  .send("statement error");
                              }
                            }
                          );
                          if (sync1) {
                            require("deasync").sleep(100);
                          }
                        });
                      } else {
                        return response.status(400).send("statement error");
                      }
                    }
                  );
                  if (sync) {
                    require("deasync").sleep(100);
                  }
                });
              } else {
                console.log(errActive);
              }
            }
          );
        } else {
          console.log(errOrder);
        }
      }
    );

    setTimeout(() => {
      return response.json({
        success: 1500,
        description: "ลบรายการเสร็จสิ้น",
      });
    }, 1500);
  });

  server.post("/paidOrder", (request, response) => {
    let order_id = request.body.order_id;
    console.log("order_id", order_id);
    let date = new Date();
    let payment_code = "gc" + date.getFullYear() + date.getMonth() + makeid(24);
    var qryProduct = `UPDATE checkout SET payment = true, payment_code = ? WHERE id = ?`;
    connection.query(
      qryProduct,
      [payment_code, order_id],
      function (err, result, fields) {
        if (!err) {
          return response.json({
            success: 1000,
            description: "ปิดการขายเสร็จสิ้น",
          });
        } else {
          console.log(err);
          return response.status(400).send("statement error");
        }
      }
    );
  });

  server.post("/getHistoryDetail", (request, response) => {
    let order_id = request.body.order_id;
    // console.log(order_id);
    var qry = `select c.*,CONCAT(a.firstname, " " ,a.lastname) as admin_name, (select SUM(cd.price * cd.count) from checkout_detail as cd where cd.checkout_id = c.id and cd.active = true) as price,
    (select SUM(cd.count) from checkout_detail as cd where cd.checkout_id = c.id  and cd.active = true) as total from checkout as c
    join admin as a on a.id = c.admin_id
     where c.id = ? and c.active = true`;
    connection.query(qry, [order_id], function (err, result, fields) {
      //   console.log(result);
      if (!err) {
        // console.log(result);
        if (result.length > 0) {
          var qry1 = `
          select cd.id,cd.checkout_id,sum(cd.count) as total,p.product_name, p.product_image,p.id as product_id, cd.price from checkout_detail as cd 
          join product_price as pp on pp.id = cd.price_id 
          join product as p on p.id = pp.product_id
          where cd.checkout_id = ? and cd.active = true
          group by cd.id`;
          connection.query(qry1, [order_id], function (err, result1, fields) {
            //   console.log(result);
            if (!err) {
              // console.log(result);
              var column = [
                //   {
                //     name: "วันเวลาที่สร้างรายการ",
                //     show: true,
                //     field: "created_at",
                //     type: "datetime",
                //   },
                {
                  name: "ชื่อสินค้า",
                  show: true,
                  field: "product_name",
                  type: "str",
                },
                {
                  name: "รูปภาพ",
                  show: true,
                  field: "product_image",
                  type: "image",
                },
                { name: "ราคา (บาท)", show: true, field: "price", type: "int" },
                {
                  name: "จำนวนสินค้า (ชิ้น)",
                  show: true,
                  field: "total",
                  type: "int",
                },
                {
                  name: "ราคาทั้งหมด",
                  show: true,
                  field: "total_price",
                  type: "int",
                },
              ];
              let res = result1.map((e, ind) => {
                e.total_price = e.price * e.total;
                return e;
              });
              return response.json({
                success: 1000,
                result: {
                  order: result[0],
                  order_data: { column: column, data: res },
                },
              });
            } else {
              console.log(err);
              return response.status(400).send("statement error");
            }
          });
        } else {
          return response.status(400).send("ไม่พบรายการหรือถูกลบไปแล้ว");
        }
      } else {
        console.log(err);
        return response.status(400).send("statement error");
      }
    });
  });

  server.post("/dailyReport", (request, response) => {
    let shop_id = request.body.shop_id;
    console.log(request.body);
    let date = new Date(request.body.date);

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
    let qry = `select c.*, (select SUM(cd.price * cd.count) from checkout_detail as cd where cd.checkout_id = c.id and cd.active = true) as price,
(select SUM(cd.count) from checkout_detail as cd where cd.checkout_id = c.id  and cd.active = true) as total from checkout as c
where created_at BETWEEN ? AND ? and c.active = true and c.payment = true`;
    let param = [dateForm, dateTo];
    if (shop_id) {
      qry += " and c.shop_id = ?";
      param.push(shop_id);
    }
    console.log("param", param);
    console.log("qry", qry);

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
  });
  // server.post("/weeklyReport", (request, response) => {
  //   let shop_id = request.body.shop_id;
  //   console.log(request.body);
  //   let rawDateFrom = new Date(request.body.dateFrom);
  //   let rawDateTo = new Date(request.body.dateTo);

  //   let dateForm =
  //     rawDateFrom.getFullYear() +
  //     "-" +
  //     (rawDateFrom.getMonth() + 1 >= 10
  //       ? rawDateFrom.getMonth() + 1
  //       : "0" + (rawDateFrom.getMonth() + 1)) +
  //     "-" +
  //     rawDateFrom.getDate() +
  //     " 00:00:00";
  //   let dateTo =
  //     rawDateTo.getFullYear() +
  //     "-" +
  //     (rawDateTo.getMonth() + 1 >= 10
  //       ? rawDateTo.getMonth() + 1
  //       : "0" + (rawDateTo.getMonth() + 1)) +
  //     "-" +
  //     rawDateTo.getDate() +
  //     " 23:59:59";

  //   console.log("dateForm", dateForm);
  //   console.log("dateTo", dateTo);

  //   let qry = `select distinct DATE(c.created_at) as order_date, (select SUM(cd.price * cd.total) from checkout_detail as cd where date(cd.created_at) = DATE(order_date) and cd.active = true group by date(cd.created_at)) as price from checkout as c
  //   where created_at BETWEEN ? AND ? and c.active = true and c.payment = true`;
  //   let param = [dateForm, dateTo];
  //   if (shop_id) {
  //     qry += " and c.shop_id = ?";
  //     param.push(shop_id);
  //   }
  //   connection.query(qry, param, function (err, result, fields) {
  //     if (!err) {
  //       console.log(result);
  //       return response.json({
  //         success: 1000,
  //         result: result,
  //       });
  //     } else {
  //       console.log(err);
  //       return response.status(400).send("statement error");
  //     }
  //   });
  // });

  server.post("/monthlyReport", (request, response) => {
    let shop_id = request.body.shop_id;
    // console.log(request.body);
    let month = request.body.month;
    let rawDateFrom = new Date(new Date().getFullYear(), month, 1);
    let rawDateTo = new Date(new Date().getFullYear(), month + 1, 0);

    let dateForm =
      rawDateFrom.getFullYear() +
      "-" +
      (rawDateFrom.getMonth() + 1 >= 10
        ? rawDateFrom.getMonth() + 1
        : "0" + (rawDateFrom.getMonth() + 1)) +
      "-" +
      rawDateFrom.getDate() +
      " 00:00:00";
    let dateTo =
      rawDateTo.getFullYear() +
      "-" +
      (rawDateTo.getMonth() + 1 >= 10
        ? rawDateTo.getMonth() + 1
        : "0" + (rawDateTo.getMonth() + 1)) +
      "-" +
      rawDateTo.getDate() +
      " 23:59:59";

    console.log("monthlyReport", dateForm, dateTo);
    let qry = `select distinct DATE(c.created_at) as order_date, (select SUM(cd.price * cd.count)  from checkout_detail as cd join checkout as c on c.id = cd.checkout_id where date(cd.created_at) = DATE(order_date)  and cd.active = true and c.payment = true  group by date(cd.created_at)) as price from checkout as c
    where created_at BETWEEN ? AND ? and c.active = true and c.payment = true`;
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
  });
  server.post("/weeklyReport", (request, response) => {
    let shop_id = request.body.shop_id;
    // console.log(request.body);
    let rawDateFrom = new Date(request.body.dateFrom);
    let rawDateTo = new Date(request.body.dateTo);

    let dateForm =
      rawDateFrom.getFullYear() +
      "-" +
      (rawDateFrom.getMonth() + 1 >= 10
        ? rawDateFrom.getMonth() + 1
        : "0" + (rawDateFrom.getMonth() + 1)) +
      "-" +
      rawDateFrom.getDate() +
      " 00:00:00";
    let dateTo =
      rawDateTo.getFullYear() +
      "-" +
      (rawDateTo.getMonth() + 1 >= 10
        ? rawDateTo.getMonth() + 1
        : "0" + (rawDateTo.getMonth() + 1)) +
      "-" +
      rawDateTo.getDate() +
      " 23:59:59";

    console.log("weekly", dateForm, dateTo);
    let qry = `select distinct DATE(c.created_at) as order_date, (select SUM(cd.price * cd.count)  from checkout_detail as cd join checkout as c on c.id = cd.checkout_id where date(cd.created_at) = DATE(order_date)  and cd.active = true and c.payment = true  group by date(cd.created_at)) as price from checkout as c
    where created_at BETWEEN ? AND ? and c.active = true and c.payment = true`;
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
  });
  server.post("/dailyReportDetail", (request, response) => {
    let shop_id = request.body.shop_id;
    console.log(request.body);
    let date = new Date(request.body.date);

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
    let qry = `select c.id,cd.*,ps.stock_price as stock_price, ps.product_id,p.product_image, p.product_name from checkout as c join checkout_detail as cd on cd.checkout_id = c.id
    join checkout_detail_stock as cds on cds.checkout_detail_id = cd.id
      join product_stock as ps on ps.id = cds.stock_id
      join product as p on p.id = ps.product_id
           where c.created_at BETWEEN ? AND ? and c.active = true and c.payment = true and cd.active =true`;
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
  });

  server.post("/weeklyReportDetail", (request, response) => {
    let shop_id = request.body.shop_id;
    console.log(request.body);
    let rawDateFrom = new Date(request.body.dateFrom);
    let rawDateTo = new Date(request.body.dateTo);

    let dateForm =
      rawDateFrom.getFullYear() +
      "-" +
      (rawDateFrom.getMonth() + 1 >= 10
        ? rawDateFrom.getMonth() + 1
        : "0" + (rawDateFrom.getMonth() + 1)) +
      "-" +
      rawDateFrom.getDate() +
      " 00:00:00";
    let dateTo =
      rawDateTo.getFullYear() +
      "-" +
      (rawDateTo.getMonth() + 1 >= 10
        ? rawDateTo.getMonth() + 1
        : "0" + (rawDateTo.getMonth() + 1)) +
      "-" +
      rawDateTo.getDate() +
      " 23:59:59";

    console.log(dateForm, dateTo);
    let qry = `select c.id,cd.*,ps.stock_price as stock_price, ps.product_id,p.product_image, p.product_name from checkout as c join checkout_detail as cd on cd.checkout_id = c.id
    join checkout_detail_stock as cds on cds.checkout_detail_id = cd.id
      join product_stock as ps on ps.id = cds.stock_id
      join product as p on p.id = ps.product_id
           where c.created_at BETWEEN ? AND ? and c.active = true and c.payment = true and cd.active =true`;
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
  });

  server.post("/monthlyReportDetail", (request, response) => {
    let shop_id = request.body.shop_id;
    // console.log(request.body);
    let month = request.body.month;
    let year = request.body.year ?? new Date().getFullYear();

    let rawDateFrom = new Date(year, month, 1);
    let rawDateTo = new Date(year, month + 1, 0);

    let dateForm =
      rawDateFrom.getFullYear() +
      "-" +
      (rawDateFrom.getMonth() + 1 >= 10
        ? rawDateFrom.getMonth() + 1
        : "0" + (rawDateFrom.getMonth() + 1)) +
      "-" +
      rawDateFrom.getDate() +
      " 00:00:00";
    let dateTo =
      rawDateTo.getFullYear() +
      "-" +
      (rawDateTo.getMonth() + 1 >= 10
        ? rawDateTo.getMonth() + 1
        : "0" + (rawDateTo.getMonth() + 1)) +
      "-" +
      rawDateTo.getDate() +
      " 23:59:59";

    console.log(dateForm, dateTo);
    let qry = `select c.id,cd.*,ps.stock_price as stock_price, ps.product_id,p.product_image, p.product_name from checkout as c join checkout_detail as cd on cd.checkout_id = c.id
    join checkout_detail_stock as cds on cds.checkout_detail_id = cd.id
      join product_stock as ps on ps.id = cds.stock_id
      join product as p on p.id = ps.product_id
           where c.created_at BETWEEN ? AND ? and c.active = true and c.payment = true and cd.active =true`;
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
  });

  server.get("/test", (request, response) => {
    connection.query("select * from shop", [], function (err, result, fields) {
      if (!err) {
        return response.json({
          success: 1000,
          result: result,
        });
      } else {
        console.log(err);
        return response.status(400).send("statement error");
      }
    });
  });
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
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

// for copy

// connection.query(
//     qryStock,
//     [],
//     function (err, res, field) {
//       if (!err) {
//       } else {
//         console.log(err);
//         return response.status(400).send("statement error");
//       }
//       // console.log(count);
//     }
//   );
