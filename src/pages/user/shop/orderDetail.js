import React, { useEffect, useState } from "react";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { connect } from "react-redux";
import { withTranslation } from "../../../../i18n";
import { Button, CardActionArea, CardActions } from "@mui/material";

import helper from "../../../utils/helper";
import { withRouter } from "next/router";
import MenuShop from "../../component/MenuShop";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import api from "../../../utils/api";
import Modal from "@mui/material/Modal";
import CustomizedTables from "../../component/CustomizedTables";
import ProductList from "../../component/productList";
const mdTheme = createTheme();
import Swal from "sweetalert2";

const API = api.create();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const OrderDetail = (props) => {
  console.log(props);
  const [admin, setAdmin] = React.useState(JSON.parse(helper.getItem("admin")));
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState({ column: [], data: [] });
  const [shop, setShop] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderDetailTmp, setOrderDetailTmp] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getOrderDetail(props.router.query.order_id);
  };
  //   //   let admin = helper.getItem("admin");
  //   console.log(admin);

  React.useEffect(() => {
    if (!admin) {
      window.location.href = "/";
    } else {
      if (props.router.query.id) {
        API.getPermission(admin.id, props.router.query.id)
          .then((response) => {
            setShop(response.data.result);

            setVisible(true);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            window.location.href = "/";
          });
        // console.log(props.router.query.id);
      } else {
        window.location.href = "/";
      }
      // API.getPermission(admin.id)
      //   .then((response) => {
      //     //   console.log(response);
      //     setShop(response.data.result);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }, [admin]);
  // useEffect(() => {
  //   if (props.router.query.id) {
  //     console.log(props.router.query.id);
  //   }
  // });
  useEffect(() => {
    if (visible) {
      getOrderDetail(props.router.query.order_id);
      //   console.log(shop.shop_name);
    }
  }, [visible]);
  //   const getOrder = () => {
  //     // console.log({ shop_id: shop.id });
  //     API.getOrder({ shop_id: shop.id })
  //       .then((response) => {
  //         console.log(response);
  //         setOrder(response.data.result);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         //   window.location.href = "/";
  //       });
  //   };
  const getOrderDetail = (id) => {
    // console.log({ shop_id: shop.id });
    API.getOrderDetail({ order_id: id })
      .then((response) => {
        console.log(response);
        setOrderDetail(response.data.result);
        // setOrder(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "ไม่พบรายการสั่งซื้อ",
          timer: 1000,
        }).then(() => {
          window.location.href = "/shop/" + shop.id + "/order/";
        });
        //   window.location.href = "/";
      });
  };

  const removeOrderProduct = (id, od_id) => {
    API.removeOrderProduct({ id: id, order_id: od_id })
      .then((response) => {
        getOrderDetail(od_id);
        getOrder();
        Swal.fire({
          icon: "success",
          title: "ลบสินค้าแล้ว",
          timer: 1000,
        });
        //   console.log(response);
        // setProduct(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        //   window.location.href = "/";
      });
  };

  const deleteOrder = (id) => {
    API.deleteOrder({ order_id: id })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "ลบรายการแล้ว",
          timer: 1000,
        }).then(() => {
          window.location.href = "/shop/" + shop.id + "/order/";
        });
        //   console.log(response);
        // setProduct(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        //   window.location.href = "/";
      });
  };

  return (
    <ThemeProvider theme={mdTheme}>
      {visible ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <MenuShop
            header={"Order " + shop?.shop_name}
            shop_id={shop?.id}
          ></MenuShop>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <div style={{ padding: 20, backgroundColor: "white" }}>
              <h2 id="child-modal-title">รายละเอียดรายการ</h2>
              <label>
                วันที่{" "}
                {helper.momentDateTime(
                  orderDetail?.order?.created_at,
                  "short",
                  false
                )}{" "}
                ผู้สร้างรายการ {orderDetail?.order?.admin_name}
              </label>
              <br />
              <label>
                หมายเหตุ{" "}
                {orderDetail?.order.remark !== null &&
                orderDetail?.order?.remark !== ""
                  ? orderDetail?.order?.remark
                  : "-"}
              </label>
              <br />
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      handleOpen();
                    }}
                  >
                    เพิ่มรายการ
                  </Button>
                </div>
                <div>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      Swal.fire({
                        title: "ต้องการลบรายการหรือไม่ ?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "ใช่",
                        cancelButtonText: "ไม่ใช่",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteOrder(props.router.query.order_id);
                        }
                      });
                    }}
                  >
                    ลบคำสั่งซื้อ
                  </Button>
                </div>
              </div>
              <Box
                // component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                // noValidate
                // autoComplete="off"
                // onSubmit={handleSubmit}
              >
                {orderDetail ? (
                  <div style={{ width: "100%" }}>
                    <CustomizedTables
                      data={orderDetail.order_data}
                      onClick={(id) => {
                        // getOrderDetail(id);
                        // handleOpen();
                        // // console.log("id", id);
                      }}
                      clickDelete={(id) => {
                        if (orderDetail.order_data.data.length > 1) {
                          removeOrderProduct(id, orderDetail.order.id);
                        } else {
                          Swal.fire({
                            title: "ไม่สามารถลบได้เนื่องจากเหลือรายการเดียว",
                            icon: "warning",
                            showConfirmButton: false,
                            timer: 1000,
                          }).then((result) => {});
                        }
                        console.log("clickDelete", id);
                      }}
                    ></CustomizedTables>
                    <label>
                      จำนวนรายการ {orderDetail?.order_data.data.length} รายการ
                    </label>
                    <br />
                    <label>
                      จำนวน{" "}
                      {helper.numberWithCommasNoFloat(
                        orderDetail?.order?.total
                      )}{" "}
                      ชิ้น
                    </label>
                    <br />
                    <label>
                      รวมทั้งหมด{" "}
                      {helper.numberWithCommasNoFloat(
                        orderDetail?.order?.price
                      )}{" "}
                      บาท
                    </label>
                  </div>
                ) : null}
              </Box>
            </div>
          </Box>
        </Box>
      ) : (
        "loading"
      )}
      <ProductList
        open={open}
        shop_id={shop.id}
        handleClose={handleClose}
        order_id={props.router.query.order_id}
      />
    </ThemeProvider>
  );
};
// export default Shop;

export default connect((state) => state)(withRouter(OrderDetail));
