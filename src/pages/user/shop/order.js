import React, { useEffect, useState } from "react";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { connect } from "react-redux";
import { withTranslation } from "../../../../i18n";
import helper from "../../../utils/helper";
import { withRouter } from "next/router";
import MenuShop from "../../component/MenuShop";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import api from "../../../utils/api";
import Modal from "@mui/material/Modal";
import CustomizedTables from "../../component/CustomizedTables";
import { Button, CardActionArea, CardActions } from "@mui/material";
import ProductList from "../../component/productList";
import Swal from "sweetalert2";
const mdTheme = createTheme();

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
const Order = (props) => {
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
    getOrder();
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
      getOrder();
      //   console.log(shop.shop_name);
    }
  }, [visible]);
  const getOrder = () => {
    // console.log({ shop_id: shop.id });
    API.getOrder({ shop_id: shop.id })
      .then((response) => {
        console.log(response);
        setOrder(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        //   window.location.href = "/";
      });
  };
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
        //   window.location.href = "/";
      });
  };

  const deleteOrder = (id) => {
    API.deleteOrder({ order_id: id })
      .then((response) => {
        getOrder();
        // getOrderDetail(od_id);
        getOrder();
        Swal.fire({
          icon: "success",
          title: "ลบรายการแล้ว",
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

  const paidOrder = (id) => {
    API.paidOrder({ order_id: id })
      .then((response) => {
        getOrder();
        // getOrderDetail(od_id);
        getOrder();
        Swal.fire({
          icon: "success",
          title: "ปิดการขายแล้ว",
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

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <div style={{ flex: 1 }}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  เพิ่มคำสั่งซื้อ
                </Button>
              </div>
              <CustomizedTables
                data={order}
                onClick={(id, index) => {
                  // setOrderDetailTmp(order.data[index]);
                  // getOrderDetail(id);
                  // handleOpen();
                  window.location.href = "/shop/" + shop.id + "/order/" + id;
                  // console.log("id", id);
                }}
                print={true}
                clickDelete={(id) => {
                  deleteOrder(id);
                  console.log("clickDelete", id);
                }}
                clickPrint={(id) => {
                  window.location.href =
                    "/shop/" + shop.id + "/order/print/" + id;
                }}
                paid={true}
                clickPaid={(id) => {
                  Swal.fire({
                    title: "ต้องการปิดการขายหรือไม่ ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ใช่",
                    cancelButtonText: "ไม่ใช่",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      paidOrder(id);
                    }
                  });
                }}
              ></CustomizedTables>
            </Container>
          </Box>
        </Box>
      ) : (
        "loading"
      )}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "80%" }}>
          <h2 id="child-modal-title">รายละเอียดรายการ</h2>
          <label>
            วันที่{" "}
            {helper.momentDateTime(orderDetailTmp?.created_at, "short", false)}{" "}
            ผู้สร้างรายการ {orderDetailTmp?.admin_name}
          </label>
          <br />
          <label>
            หมายเหตุ{" "}
            {orderDetailTmp?.remark !== null && orderDetailTmp?.remark !== ""
              ? orderDetailTmp?.remark
              : "-"}
          </label>
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
                    removeOrderProduct(id, orderDetail.order.id);
                    // console.log("clickDelete", id);
                  }}
                ></CustomizedTables>
                <label>จำนวน {orderDetailTmp?.total} ชิ้น</label>
                <br />
                <label>รวมทั้งหมด {orderDetailTmp?.price} บาท</label>
              </div>
            ) : null}
          </Box>
        </Box>
      </Modal> */}
      <ProductList
        open={open}
        shop_id={shop.id}
        handleClose={handleClose}
        // order_id={props.router.query.order_id}
        newOrder={true}
      />
    </ThemeProvider>
  );
};
// export default Shop;

export default connect((state) => state)(withRouter(Order));
