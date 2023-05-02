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
import DailyDashboard from "../../component/DailyChart";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
const mdTheme = createTheme();
import Paper from "@mui/material/Paper";
import Deposits from "../../component/Deposits";
import Orders from "../../component/Orders";
import Title from "../../component/Title";
import WeeklyDashboard from "../../component/WeeklyCart";
import MonthlyDashboard from "../../component/MonthlyChart";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import CustomizedTables from "../../component/CustomizedTables";
const API = api.create();
const Shop = (props) => {
  console.log(props);
  const [admin, setAdmin] = React.useState(JSON.parse(helper.getItem("admin")));
  const [selectDate, setSelectDate] = useState(moment(new Date()));

  const [visible, setVisible] = useState(false);
  const [shop, setShop] = useState(null);
  const [data, setDate] = useState(null);
  //   //   let admin = helper.getItem("admin");
  //   console.log(admin);

  //   console.log(testData, stock_price, total);
  React.useEffect(() => {
    if (!admin) {
      window.location.href = "/";
    } else {
      if (props.router.query.id) {
        API.getPermission(admin.id, props.router.query.id)
          .then((response) => {
            setShop(response.data.result);
            setVisible(true);
            // console.log(response);
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
  const handleChange = (newValue) => {
    // console.log(newValue);
    setSelectDate(newValue);
    dailyReportDetail(newValue);
  };
  useEffect(() => {
    if (shop) {
      dailyReportDetail(selectDate);
    }
  }, [shop]);
  const dailyReportDetail = (date) => {
    API.dailyReportDetail({ shop_id: shop.id, date: date })
      .then((response) => {
        console.log(response.data.result);
        let getProductID = [
          ...new Set(
            response.data.result.map((ele, index) => {
              return ele.product_id;
            })
          ),
        ];
        let stock_price = 0;
        let count_all = 0;
        let total = 0;

        let mapdata = getProductID.map((ele) => {
          let d = response.data.result.filter((e) => e.product_id == ele);
          let returnValue = {
            product_name: "",
            product_image: "",
            total_price: 0,
            count: 0,
            total_stock_price: 0,
          };
          d.forEach((e) => {
            returnValue.product_name = e.product_name;
            returnValue.product_image = e.product_image;
            returnValue.count += e.total;
            returnValue.total_price += e.price * e.total;
            returnValue.total_stock_price += e.stock_price * e.total;
            stock_price += e.stock_price * e.total;
            total += e.price * e.total;
            count_all += e.total;
          });
          return returnValue;
        });
        let column = [
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
          {
            name: "จำนวนสินค้า (ชิ้น)",
            show: true,
            field: "count",
            type: "int",
          },
          { name: "ราคา (บาท)", show: true, field: "total_price", type: "int" },

          {
            name: "ราคาทั้งหมด",
            show: true,
            field: "total_stock_price",
            type: "int",
          },
        ];
        setDate({
          data: { column: column, data: mapdata },
          total: total,
          stock_price: stock_price,
          count_all: count_all,
        });
        // console.log(mapdata);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ThemeProvider theme={mdTheme}>
      {visible ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <MenuShop
            header={"รายวัน " + helper.momentDate(selectDate, "short")}
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
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <DesktopDatePicker
                    label="เลือกวันที่"
                    inputFormat="MM/DD/YYYY"
                    value={selectDate}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <div style={{ padding: 20 }}>
                    ยอดขายทั้งหมด: {helper.numberWithCommasNoFloat(data?.total)}
                    {" บาท, "}
                    ราคา stock:{" "}
                    {helper.numberWithCommasNoFloat(data?.stock_price)}
                    {" บาท, "}จำนวนที่ขายได้:{" "}
                    {helper.numberWithCommasNoFloat(data?.count_all)}
                    {" ชิ้น"}
                  </div>
                </div>
              </LocalizationProvider>
              <br />
              <br />
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 330,
                }}
              >
                <DailyDashboard shop_id={shop.id} date={selectDate} />
              </Paper>
              <br />
              {data ? (
                <div style={{ hight: 500 }}>
                  <CustomizedTables
                    data={data?.data}
                    onClick={(id) => {
                      // getOrderDetail(id);
                      // handleOpen();
                      // // console.log("id", id);
                    }}
                    showDelete={false}
                  ></CustomizedTables>
                </div>
              ) : null}
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

export default connect((state) => state)(withRouter(Shop));
