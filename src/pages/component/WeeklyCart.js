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
const WeeklyDashboard = (props) => {
  const { shop_id = null, def = "24" } = props;
  let date = new Date();
  let defaultWeek = [6, 5, 4, 3, 2, 1, 0].map((ele, index) => {
    let name = helper.momentDate(
      new Date(
        date.getFullYear(),
        date.getMonth() >= 10 ? date.getMonth() : "0" + date.getMonth(),
        date.getDate() - ele
      ),
      "short",
      false
    );
    return { name: name, total: 0, key: date.getDate() - ele };
  });
  const [data, setData] = useState(defaultWeek);
  // const data = []
  // console.log(data);
  useEffect(() => {
    // setData();
    setData(defaultWeek);
    getWeekly();
  }, []);
  // useEffect(() => {
  //   if (data) {
  //     getWeekly();
  //   }
  // }, [data]);
  const getWeekly = () => {
    let dateTo = new Date();
    let dateFrom = new Date(
      dateTo.getFullYear(),
      dateTo.getMonth(),
      dateTo.getDate() - 7
    );

    API.weeklyReport({ shop_id: shop_id, dateFrom: dateFrom, dateTo: dateTo })
      .then((response) => {
        console.log(response);
        let tmp = [...data];
        response.data.result.forEach((ele, index) => {
          // let key = 0;
          // let date = new Date(ele.order_date);
          // console.log(date);
          let date = new Date(ele.order_date);
          console.log(date);
          tmp.forEach((e) => {
            if (e.key == date.getDate()) {
              e.total = ele.price;
            }
          });
        });
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
        <Bar dataKey="total" fill="#F00" name="ราคาขาย" />
        {/* <Bar dataKey="count" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyDashboard;
