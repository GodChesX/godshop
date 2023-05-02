import React, { useEffect, useState } from "react";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import api from "../../utils/api";
import CardProductOrder from "./CardProductOrder";
import Modal from "@mui/material/Modal";
import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
const mdTheme = createTheme();
import { Button, CardActionArea, CardActions } from "@mui/material";
import Swal from "sweetalert2";
import helper from "../../utils/helper";
import PropTypes from "prop-types";

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
const API = api.create();
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
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
      prefix="฿"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

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
const ProductList = (props) => {
  const { open, shop_id, handleClose, newOrder = false } = props;
  const [product, setProduct] = useState([]);
  const [productTmp, setProductTmp] = useState([]);
  const [addItem, setAddItem] = useState([]);
  const [admin, setAdmin] = React.useState(JSON.parse(helper.getItem("admin")));

  const [showItem, setShowItem] = useState(false);
  // const [search, setSearch] = useState("");
  const [search, setSearch] = useState("");
  const [remark, setRemark] = useState("");

  //   const [countAllItem, setCountAllItem] = useState(null);
  //   const [countAllPrice, setCountAllPrice] = useState(null);

  const handleItem = () => {
    setShowItem(!showItem);
  };
  useEffect(() => {
    if (open) {
      getProduct();
      //   console.log(shop.shop_name);
    }
  }, [open]);
  const getProduct = () => {
    API.getProduct(shop_id, true)
      .then((response) => {
        //   console.log(response);
        var product = response.data.result.map((e) => {
          e.count = 1;
          return e;
        });
        setProduct(product);
        setProductTmp(product);
      })
      .catch((error) => {
        console.log(error);
        //   window.location.href = "/";
      });
  };
  useEffect(() => {
    if (search !== "") {
      let p = productTmp;
      let val = p.filter((e) => e.product_name.includes(search));
      console.log(val);
      setProduct(val);
    } else {
      setProduct(productTmp);
    }
  }, [search]);
  useEffect(() => {
    console.log(addItem);
  }, [addItem]);
  const getPrice = () => {
    let price = 0;
    addItem.forEach((e) => {
      price += e.total;
    });
    return price;
  };
  const getTotal = () => {
    let total = 0;
    addItem.forEach((e) => {
      total += e.count;
    });
    return total;
  };
  const addItemToOrder = () => {
    // console.log(props.order_id);
    API.addItem({ order_id: props.order_id, item: addItem })
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "เพิ่มรายการเรียบร้อยแล้ว",
          timer: 1000,
        });
        setAddItem([]);
        handleItem();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        //   window.location.href = "/";
      });
  };
  const addNewOrder = () => {
    // console.log(props.order_id);
    API.addNewOrder({
      remark: remark,
      item: addItem,
      admin_id: admin.id,
      shop_id: shop_id,
    })
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "เพิ่มคำสั่งซื้อเรียบร้อยแล้ว",
          timer: 1000,
        });
        setAddItem([]);
        handleItem();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        //   window.location.href = "/";
      });
  };
  return (
    <div>
      {open ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box
            sx={{ ...style, width: "80%", height: "90%", overflow: "scroll" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <TextField
                margin="normal"
                required
                //   fullWidth
                id="search"
                label="ค้นหาสินค้า"
                name="search"
                autoFocus
                onChange={(value) => {
                  // console.log(value);
                  setSearch(value.target.value);
                }}
              />
              <label
                style={{
                  border: "solid",
                  borderRadius: 50,
                  padding: 10,
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (addItem.length > 0) {
                    handleItem();
                  }
                }}
              >
                <AddShoppingCartTwoToneIcon />
                {addItem.length > 0 ? (
                  <div
                    style={{
                      position: "absolute",
                      marginLeft: 20,
                      marginBottom: 30,
                      borderRadius: 50,
                      backgroundColor: "red",
                      color: "white",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {addItem.length}
                  </div>
                ) : null}
              </label>
            </div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              // noValidate
              // autoComplete="off"
              // onSubmit={handleSubmit}
            >
              <div style={{ width: "100%", height: "90%", overflow: "scroll" }}>
                {product.map((ele, index) => {
                  return (
                    <CardProductOrder
                      data={ele}
                      onClick={() => {}}
                      index={index}
                      key={"product" + index}
                      onChange={(val) => {
                        let tmp = [...product];
                        tmp[index].count = parseInt(val);
                        setProduct(tmp);
                      }}
                      up={() => {
                        let tmp = [...product];
                        if (tmp[index].count + 1 <= parseInt(ele.stock))
                          tmp[index].count = tmp[index].count + 1;
                        setProduct(tmp);
                      }}
                      down={() => {
                        let tmp = [...product];
                        if (tmp[index].count - 1 >= 1)
                          tmp[index].count = tmp[index].count - 1;
                        setProduct(tmp);
                      }}
                      add={() => {
                        let tmp = [...addItem];
                        // let check = tmp.filter(e=> e.id == ele.id);
                        let check = false;
                        // if(check.length > 1){
                        tmp = tmp.map((e) => {
                          if (e.id == ele.id) {
                            e.count += ele.count;
                            e.total = e.price * e.count;
                            check = true;
                          }
                          return e;
                        });
                        if (!check) {
                          tmp.push({
                            id: ele.id,
                            name: ele.product_name,
                            price: ele.price,
                            total: ele.price * ele.count,
                            count: ele.count,
                          });
                        }
                        // }
                        setAddItem(tmp);
                      }}
                    />
                  );
                })}
              </div>
            </Box>
          </Box>
        </Modal>
      ) : null}
      <Modal
        open={showItem}
        onClose={handleItem}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "80%", height: "80%", overflow: "scroll" }}>
          <div style={{ height: "80%", overflow: "scroll" }}>
            <label>รายการที่เพิ่ม</label>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                //   justifyContent: "space-between",
              }}
            >
              <label style={{ display: "flex", flex: 1 }}>ลำดับ</label>
              <label
                style={{
                  display: "flex",
                  flex: 1,
                  //   justifyContent: "end",
                }}
              >
                ชื่อสินค้า
              </label>
              <label
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "end",
                }}
              >
                ราคา
              </label>
              <label
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "end",
                }}
              >
                จำนวน
              </label>
              <label
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "end",
                }}
              >
                รวม
              </label>
              <label
                style={{
                  display: "flex",
                  flex: 0.5,
                  justifyContent: "center",
                }}
              ></label>
            </div>
            {addItem.map((ele, index) => {
              return (
                <div key={"add" + index}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      // justifyContent: "space-between",
                    }}
                  >
                    <label style={{ display: "flex", flex: 1 }}>
                      {index + 1}
                    </label>
                    <label
                      style={{
                        display: "flex",
                        flex: 1,
                        // justifyContent: "end",
                      }}
                    >
                      {ele.name}
                    </label>
                    <label
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "end",
                      }}
                    >
                      {/* <TextField
                          margin="normal"
                          size={"small"}
                          variant="standard"
                          required
                          //   fullWidth
                          width={60}
                          id="price"
                          label="ราคาขาย"
                          name="price"
                          autoFocus
                          defaultValue={ele.price}
                          value={ele.price}
                          onChange={(value) => {
                            // console.log(value);
                            // setRemark(value.target.value);
                            let tmp = [...addItem];
                            // tmp.splice(index, 1);
                            tmp[index] = value.target.value;
                            setAddItem(tmp);
                          }}
                        /> */}
                      {newOrder ? (
                        <input
                          type="number"
                          min="1"
                          max="10000"
                          // defaultValue={ele.price}
                          value={ele.price}
                          onChange={(value) => {
                            // console.log(value);
                            // setRemark(value.target.value);
                            let tmp = [...addItem];
                            // tmp.splice(index, 1);
                            tmp[index].price = value.target.value;
                            tmp[index].total = ele.count * tmp[index].pric;
                            setAddItem(tmp);
                          }}
                        />
                      ) : (
                        ele.price
                      )}{" "}
                      บาท
                    </label>
                    <label
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "end",
                      }}
                    >
                      {ele.count} ชิ้น
                    </label>
                    <label
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "end",
                      }}
                    >
                      {ele.total} บาท
                    </label>
                    <label
                      style={{
                        display: "flex",
                        flex: 0.5,
                        justifyContent: "center",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        let tmp = [...addItem];
                        tmp.splice(index, 1);
                        setAddItem(tmp);
                        if (tmp.length == 0) {
                          setShowItem(false);
                        }
                      }}
                    >
                      ลบ
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              justifyContent: "end",
              height: "20%",
            }}
          >
            {/* {" "} */}
            <label style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>จำนวนรายการ </div>
              <div>{addItem.length} </div>
              <div style={{ flex: 0.1, textAlign: "end" }}>รายการ</div>
            </label>
            <label style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>จำนวน </div>
              <div>{getTotal()} </div>
              <div style={{ flex: 0.1, textAlign: "end" }}>ชิ้น</div>
            </label>
            <label style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>รวมทั้งหมด </div>
              <div>{getPrice()} </div>
              <div style={{ flex: 0.1, textAlign: "end" }}>บาท</div>
            </label>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                {newOrder ? (
                  <TextField
                    margin="normal"
                    size={"small"}
                    required
                    //   fullWidth
                    id="remark"
                    label="หมายเหตุคำสั่งซื้อ"
                    name="remark"
                    autoFocus
                    onChange={(value) => {
                      // console.log(value);
                      setRemark(value.target.value);
                    }}
                  />
                ) : null}
              </div>
              <label style={{ justifyContent: "end", display: "flex" }}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    if (newOrder) {
                      addNewOrder();
                    } else {
                      addItemToOrder();
                    }
                  }}
                >
                  {newOrder ? "เพิ่มคำสั่งซื้อ" : "เพิ่มรายการ"}
                </Button>
              </label>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
// export default Shop;

export default ProductList;
