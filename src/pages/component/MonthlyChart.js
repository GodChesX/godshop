import React, { PureComponent, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../../utils/api";
import helper from "../../utils/helper";
import Title from "./Title";
const API = api.create();
const MonthlyDashboard = (props) => {
  const { shop_id = null, def = "24" } = props;
  let date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  let defaultMonth = [];
  for (let i = 1; i <= date.getDate(); i++) {
    let name = helper.momentDate(
      new Date(
        date.getFullYear(),
        date.getMonth() >= 10 ? date.getMonth() : "0" + date.getMonth(),
        i
      ),
      "short",
      false
    );
    defaultMonth.push({ name: name, total: 0, key: i });
  }
  // let defaultMonth = new Array(date.getDate()).forEach((ele, index) => {
  //   console.log("defaultMonth", ele);
  //   let name = helper.momentDate(
  //     new Date(
  //       date.getFullYear(),
  //       date.getMonth() >= 10 ? date.getMonth() : "0" + date.getMonth(),
  //       date.getDate() - ele
  //     ),
  //     "short",
  //     false
  //   );
  //   return { name: name, total: 0, key: date.getDate() - ele };
  // });
  // console.log(defaultMonth);
  const [data, setData] = useState(defaultMonth);
  // const data = []
  useEffect(() => {
    // setData();
    setData(defaultMonth);
    getMonthly();
  }, []);
  // useEffect(() => {
  //   if (data) {
  //     getWeekly();
  //   }
  // }, [data]);
  const getMonthly = () => {
    let date = new Date();

    API.monthlyReport({ shop_id: shop_id, month: date.getMonth() })
      .then((response) => {
        console.log(response);
        let tmp = [...data];
        response.data.result.forEach((ele, index) => {
          // let key = 0;
          let date = new Date(ele.order_date);
          // console.log(date);
          // let date = new Date(ele.order_date);
          // console.log(date);
          tmp.forEach((e) => {
            if (e.key == date.getDate()) {
              e.total = ele.price;
            }
          });
        });
        console.log(tmp);
        setData(tmp);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#10bb0f" name="ราคาขาย" />
        {/* <Bar dataKey="count" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyDashboard;
