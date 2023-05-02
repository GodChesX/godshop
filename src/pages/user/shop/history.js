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
const History = (props) => {
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
    API.getOrder({ shop_id: shop.id, history: true })
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
  return (
    <ThemeProvider theme={mdTheme}>
      {visible ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <MenuShop
            header={"ประวัติการสั่งซื้อ "}
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
              <CustomizedTables
                data={order}
                onClick={(id, index) => {
                  // setOrderDetailTmp(order.data[index]);
                  // getOrderDetail(id);
                  // handleOpen();
                  window.location.href = "/shop/" + shop.id + "/history/" + id;
                  // console.log("id", id);
                }}
                showDelete={false}
              ></CustomizedTables>
            </Container>
          </Box>
        </Box>
      ) : (
        "loading"
      )}
    </ThemeProvider>
  );
};
// export default Shop;

export default connect((state) => state)(withRouter(History));
