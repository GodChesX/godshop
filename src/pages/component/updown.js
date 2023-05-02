import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
const NumericFormatCustomValue = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      // prefix="฿"
    />
  );
});

NumericFormatCustomValue.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const Updown = (props) => {
  console.log(props);

  return (
    <div>
      <div
        style={{
          padding: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <label
          style={{
            padding: 1,
            border: "solid",
            borderRadius: 50,
            width: 30,
            textAlign: "center",
            marginRight: 10,
            cursor: "pointer",
          }}
          onClick={() => {
            if (props.min >= 1) {
              props.down();
            }
          }}
        >
          -
        </label>
        <label style={{ width: "70px" }}>
          <TextField
            margin="normal"
            required
            //   fullWidth
            fontSize={13}
            id="number"
            label="จำนวน"
            name="number"
            size="small"
            value={props.count}
            // type="number"
            InputProps={{
              inputComponent: NumericFormatCustomValue,
            }}
            onChange={(value) => {
              if (
                value.target.value <= props.max &&
                value.target.value >= props.min
              ) {
                props.onChange(value.target.value);
              } else {
                if (value.target.value !== "")
                  // console.log("hello");
                  props.onChange(props.max);
              }

              // console.log(value);
              // setSearch(value.target.value);
            }}
          />
        </label>
        <label
          style={{
            padding: 1,
            border: "solid",
            borderRadius: 50,
            width: 30,
            textAlign: "center",
            marginLeft: 10,
            cursor: "pointer",
          }}
          onClick={() => {
            if (props.max >= props.count) {
              props.up();
            }
          }}
        >
          +
        </label>
      </div>
    </div>
  );
};
export default Updown;
