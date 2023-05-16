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
  const { shop_id = null, def = "24", dateStart, dateEnd } = props;

  const [data, setData] = useState();
  // const data = []
  let date = new Date();

  // console.log(data);
  // useEffect(() => {
  //   // setData();
  //   // getWeekly();
  // }, [data]);
  useEffect(() => {
    // console.log("dateStart", dateStart);
    if (dateStart && dateEnd) {
      // console.log(dateEnd - dateStart);
      let start = new Date(dateStart);
      let end = new Date(dateEnd);
      let loop;
      if (start.getMonth() != end.getMonth()) {
        loop = end.getDate();
        // if(start.getDate() > end.getDate()){
        // loop = end.getDate();
        let now = new Date(dateStart);
        now.setMonth(now.getMonth() + 1);
        now.setDate(0);
        loop += now.getDate() - start.getDate();
        // console.log(
        //   "now.getDate() - start.getDate()",
        //   now.getDate() - start.getDate()
        // );
        // }

        // console.log(loop);
      } else {
        loop = end.getDate() - start.getDate();
      }
      console.log("loop", loop);
      let defaultWeek = [];

      for (let i = loop; i >= 0; i--) {
        // console.log(i);
        let name = helper.momentDate(
          new Date(
            end.getFullYear(),
            end.getMonth() >= 10 ? date.getMonth() : "0" + date.getMonth(),
            end.getDate() - i
          ),
          "short",
          false
        );
        let key = end.getDate() - i;
        if (key <= 0) {
          let now = new Date(dateStart);
          now.setMonth(now.getMonth() + 1);
          now.setDate(0);
          key = now.getDate() - (i - end.getDate());
        }
        defaultWeek.push({ name: name, total: 0, key: key });
      }
      // [6, 5, 4, 3, 2, 1, 0].map((ele, index) => {});
      // console.log(defaultWeek);
      // setData(defaultWeek);
      getWeekly(defaultWeek);
    } else {
      console.log("here ??");
      let i = 0;
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
        let key = date.getDate() - ele;
        if (key <= 0) {
          let now = new Date();
          now.setMonth(now.getMonth());
          now.setDate(0);
          console.log("now", now.getDate());
          key = now.getDate() - (ele - date.getDate());
        } else {
          i += 1;
        }
        return { name: name, total: 0, key: key };
      });
      getWeekly(defaultWeek);

      // setData(defaultWeek);
    }
  }, [dateStart, dateEnd]);
  const getWeekly = (defaultWeek) => {
    let dateTo = new Date();
    let dateFrom = new Date(
      dateTo.getFullYear(),
      dateTo.getMonth(),
      dateTo.getDate() - 7
    );

    API.weeklyReport({
      shop_id: shop_id,
      dateFrom: dateStart ? dateStart : dateFrom,
      dateTo: dateEnd ? dateEnd : dateTo,
    })
      .then((response) => {
        console.log(response);
        let tmp = [...defaultWeek];
        // console.log(tmp);
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
        // console.log(tmp);
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
