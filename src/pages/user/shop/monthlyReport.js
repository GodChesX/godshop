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

const mdTheme = createTheme();
import Paper from "@mui/material/Paper";
import Deposits from "../../component/Deposits";
import Orders from "../../component/Orders";
import Title from "../../component/Title";
import WeeklyDashboard from "../../component/WeeklyCart";
import MonthlyDashboard from "../../component/MonthlyChart";
const API = api.create();
const Shop = (props) => {
  console.log(props);
  const [admin, setAdmin] = React.useState(JSON.parse(helper.getItem("admin")));
  const [visible, setVisible] = useState(false);
  const [shop, setShop] = useState(null);

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
  return (
    <ThemeProvider theme={mdTheme}>
      {visible ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <MenuShop
            header={"Dashboard " + shop?.shop_name}
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
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={6} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 330,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ flex: 1 }}>
                        รายวัน {helper.momentDate(new Date())}{" "}
                      </div>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          console.log("daily");
                        }}
                      >
                        รายละเอียด
                      </Button>
                    </div>

                    <DailyDashboard shop_id={shop.id} />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={6} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 330,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ flex: 1 }}>
                        รายสัปดาห์{" "}
                        {helper.momentTwoDate(
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate() - 6
                          ),
                          new Date()
                        )}
                      </div>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          console.log("weekly");
                        }}
                      >
                        รายละเอียด
                      </Button>
                    </div>
                    <WeeklyDashboard shop_id={shop.id} />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 330,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ flex: 1 }}>
                        รายเดือน{" "}
                        {helper.momentTwoDate(
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            1
                          ),
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() + 1,
                            0
                          )
                        )}
                      </div>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          console.log("monthly");
                        }}
                      >
                        รายละเอียด
                      </Button>
                    </div>
                    <MonthlyDashboard shop_id={shop.id} />
                  </Paper>
                </Grid>
              </Grid>
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
