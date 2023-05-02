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
import Title from "./Title";
const API = api.create();
const default24 = [
  {
    name: "00",
    total: 0,
  },
  {
    name: "01",
    total: 0,
  },
  {
    name: "02",
    total: 0,
  },
  {
    name: "03",
    total: 0,
  },
  {
    name: "04",
    total: 0,
  },
  {
    name: "05",
    total: 0,
  },
  {
    name: "06",
    total: 0,
  },
  {
    name: "07",
    total: 0,
  },
  {
    name: "08",
    total: 0,
  },
  {
    name: "09",
    total: 0,
  },
  {
    name: "10",
    total: 0,
  },
  {
    name: "11",
    total: 0,
  },
  {
    name: "12",
    total: 0,
  },
  {
    name: "13",
    total: 0,
  },
  {
    name: "14",
    total: 0,
  },
  {
    name: "15",
    total: 0,
  },
  {
    name: "16",
    total: 0,
  },
  {
    name: "17",
    total: 0,
  },
  {
    name: "18",
    total: 0,
  },
  {
    name: "19",
    total: 0,
  },
  {
    name: "20",
    total: 0,
  },
  {
    name: "21",
    total: 0,
  },
  {
    name: "22",
    total: 0,
  },
  {
    name: "23",
    total: 0,
  },
];
const default12 = [
  {
    name: "00-01",
    total: 0,
  },
  {
    name: "02-03",
    total: 0,
  },
  {
    name: "04-05",
    total: 0,
  },
  {
    name: "06-07",
    total: 0,
  },
  {
    name: "08-09",
    total: 0,
  },
  {
    name: "10-11",
    total: 0,
  },
  {
    name: "12-13",
    total: 0,
  },
  {
    name: "14-15",
    total: 0,
  },
  {
    name: "16-17",
    total: 0,
  },
  {
    name: "18-19",
    total: 0,
  },
  {
    name: "20-21",
    total: 0,
  },
  {
    name: "22-23",
    total: 0,
  },
];
const DailyDashnoard = (props) => {
  const { shop_id = null, def = "24", date = new Date() } = props;
  const [data, setData] = useState(default24);
  // const data = []
  useEffect(() => {
    // setData(default24);
    getDaily();
  }, []);

  useEffect(() => {
    // setData(default24);
    getDaily();
  }, [date]);
  const getDaily = () => {
    // let date = new Date();
    API.dailyReport({ shop_id: shop_id, date: date })
      .then((response) => {
        console.log(response);
        let tmp = [...data];
        tmp.forEach((e) => {
          e.total = 0;
        });
        response.data.result.forEach((ele, index) => {
          let dateTmp = new Date(ele.created_at);

          // console.log(dateTmp.getHours(), "date.getHours()");
          tmp[dateTmp.getHours()].total += parseInt(ele.price);
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
        <Bar dataKey="total" fill="#8884d8" name="ราคาขาย" />
        {/* <Bar dataKey="count" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyDashnoard;
