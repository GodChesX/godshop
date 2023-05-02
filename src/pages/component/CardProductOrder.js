import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Updown from "./updown";

const CardProductOrder = (props) => {
  //   console.log(props);
  const { data, index, onClick, up, down, add, onChange } = props;
  return (
    <div
      style={{
        float: "left",
        width: "25%",
      }}
    >
      <div style={{ padding: 5 }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea
            onClick={() => {
              onClick();
            }}
          >
            <CardMedia
              component="img"
              height="200"
              width="200"
              image={
                data.product_image
                  ? process.env.NEXT_PUBLIC_APP_ENPOINT +
                    "/image/product/" +
                    data.product_image
                  : require("../../../public/image/imgNotFound.jpg")
              }
              alt={data.product_name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.product_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                จำนวนคงเหลือ {data.stock} ชิ้น
              </Typography>
              <Typography variant="body2" color="text.primary">
                ราคา {data.price} บาท
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Updown
              max={parseInt(data.stock)}
              min={1}
              count={data.count}
              up={() => {
                up();
              }}
              down={() => {
                down();
              }}
              onChange={(val) => {
                onChange(val);
              }}
            ></Updown>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                add();
              }}
            >
              เพิ่มสินค้า
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
export default CardProductOrder;
