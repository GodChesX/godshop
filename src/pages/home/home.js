import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../component/Chart";
import Deposits from "../component/Deposits";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Orders from "../component/Orders";
import helper from "../../utils/helper";
import Menu from "../component/Menu";
import DailyDashnoard from "../component/DailyChart";
import WeeklyDashboard from "../component/WeeklyCart";
import MonthlyDashboard from "../component/MonthlyChart";
const drawerWidth = 240;

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [admin, setAdmin] = React.useState(JSON.parse(helper.getItem("admin")));
  //   let admin = helper.getItem("admin");
  console.log(admin);

  React.useEffect(() => {
    if (!admin) {
      window.location.href = "/";
    }
  }, [admin]);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Menu header={"Dashboard"}></Menu>
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
          {admin?.permission_name == "admin" ? (
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
                          // console.log("daily");
                          window.location.href = "/daily-report";
                        }}
                      >
                        รายละเอียด
                      </Button>
                    </div>

                    <DailyDashnoard />
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
                          // console.log("weekly");
                          window.location.href = "/weekly-report";
                        }}
                      >
                        รายละเอียด
                      </Button>
                    </div>
                    <WeeklyDashboard />
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
                          // console.log("monthly");
                          window.location.href = "/monthly-report";
                        }}
                      >
                        รายละเอียด
                      </Button>
                    </div>
                    <MonthlyDashboard />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          ) : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
