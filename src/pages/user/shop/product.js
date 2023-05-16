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
import CardProduct from "../../component/CardProduct";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";

const mdTheme = createTheme();
import Swal from "sweetalert2";
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
const Product = (props) => {
  //   console.log(props);
  const [admin, setAdmin] = React.useState(JSON.parse(helper.getItem("admin")));
  const [visible, setVisible] = useState(false);
  const [shop, setShop] = useState(null);
  const [search, setSearch] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock_value: "",
    stock_price: "",
    custom_price: [],
    image: null,
  });
  const [product, setProduct] = useState([]);
  const [productTmp, setProductTmp] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setNewProduct({
      name: "",
      price: "",
      stock_value: "",
      stock_price: "",
      custom_price: [],
      image: null,
    });
    setOpen(false);
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setNewProduct({
      name: "",
      price: "",
      stock_value: "",
      stock_price: "",
      custom_price: [],
      image: null,
    });
    setOpenEdit(false);
  };
  const [openAddStock, setOpenAddStock] = React.useState(false);
  const handleOpenAddStock = () => {
    setOpenAddStock(true);
  };
  const handleCloseAddStock = () => {
    setNewProduct({
      name: "",
      price: "",
      stock_value: "",
      stock_price: "",
      custom_price: [],
      image: null,
    });
    setOpenAddStock(false);
  };

  //   //   let admin = helper.getItem("admin");
  //   console.log(admin);
  const addNewProduct = () => {
    // console.log(newProduct);
    if (
      newProduct.name == "" ||
      newProduct.price == "" ||
      newProduct.stock_price == "" ||
      newProduct.stock_value == ""
    ) {
      return;
    }
    var formData = new FormData();
    if (newProduct.custom_price.length > 0) {
      let isNull = false;
      newProduct.custom_price.forEach((element) => {
        if (element.price === "" || element.amount === "") {
          isNull = true;
        }
      });
      console.log("isNull", isNull);
      if (isNull) return;
      else
        formData.append(
          "custom_price",
          JSON.stringify(newProduct.custom_price)
        );
    }

    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);

    formData.append("shop_id", shop.id);
    formData.append("stock_price", newProduct.stock_price);
    formData.append("stock_value", newProduct.stock_value);
    formData.append("admin_id", admin.id);
    if (newProduct.image) formData.append("image", newProduct.image.file);
    // console.log(formData);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    // let data = { name: newProduct.name, price: newProduct.price };
    // if (newProduct.image) data.image = newProduct.image.file;

    API.addNewProduct(formData)
      .then((response) => {
        setOpen(false);
        getProduct();
        Swal.fire({
          icon: "success",
          title: "เพิ่มสินค้าเรียบร้อยแล้ว",
          timer: 1000,
        });
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // xForm.append('product_image', newfile);
  };
  const editProduct = () => {
    if (newProduct.name == "" || newProduct.price == "") {
      return;
    }

    var formData = new FormData();
    if (newProduct.custom_price.length > 0) {
      let isNull = false;
      newProduct.custom_price.forEach((element) => {
        if (element.price === "" || element.amount === "") {
          isNull = true;
        }
      });
      console.log("isNull", isNull);
      if (isNull) return;
      else
        formData.append(
          "custom_price",
          JSON.stringify(newProduct.custom_price)
        );
    }
    // var formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("product_id", newProduct.product_id);
    // formData.append("price", newProduct.price);
    // formData.append("product_id", newProduct.product_id);
    let tmpProduct = product.filter(
      (ele) => ele.id == newProduct.product_id
    )[0];
    console.log("tmpProduct", tmpProduct);
    console.log("newProduct?.image?.uri", newProduct?.image?.uri);
    console.log(tmpProduct.product_image != newProduct?.image?.uri);
    if (tmpProduct.product_image != newProduct?.image?.uri) {
      if (newProduct.image?.file)
        formData.append("image", newProduct.image.file);
      API.editProduct(formData)
        .then((response) => {
          setOpenEdit(false);
          getProduct();
          Swal.fire({
            icon: "success",
            title: "แก้ไขสินค้าเรียบร้อยแล้ว",
            timer: 1000,
          });
          //   console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // console.log(formData);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
  };
  React.useEffect(() => {
    if (!admin) {
      window.location.href = "/";
    } else {
      if (props.router.query.id) {
        API.getPermission(admin.id, props.router.query.id)
          .then((response) => {
            // console.log(response);
            setShop(response.data.result);
            setVisible(true);
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
  const addStock = () => {
    // console.log(newProduct);
    if (newProduct.stock_price == "" || newProduct.stock_value == "") {
      return;
    }
    var formData = new FormData();
    formData.append("product_id", newProduct.product_id);
    formData.append("stock_price", newProduct.stock_price);
    formData.append("stock_value", newProduct.stock_value);
    formData.append("admin_id", admin.id);
    // console.log(formData);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    // let data = { name: newProduct.name, price: newProduct.price };
    // if (newProduct.image) data.image = newProduct.image.file;

    API.addStock(formData)
      .then((response) => {
        setOpenAddStock(false);
        getProduct();
        Swal.fire({
          icon: "success",
          title: "เพิ่ม Stock สินค้าเรียบร้อยแล้ว",
          timer: 1000,
        });
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // xForm.append('product_image', newfile);
  };
  useEffect(() => {
    if (visible) {
      getProduct();
      //   console.log(shop.shop_name);
    }
  }, [visible]);
  const getProduct = () => {
    API.getProduct(shop.id)
      .then((response) => {
        //   console.log(response);
        setProduct(response.data.result);
        setProductTmp(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        //   window.location.href = "/";
      });
  };
  const deleteProduct = (id) => {
    API.deleteProduct({ product_id: id })
      .then((response) => {
        getProduct();
        Swal.fire({
          icon: "success",
          title: "ลบสินค้าแล้ว",
          timer: 1000,
        });
        //   console.log(response);
        // setProduct(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        //   window.location.href = "/";
      });
  };
  useEffect(() => {
    console.log("newProduct", newProduct);
  }, [newProduct]);

  useEffect(() => {
    if (!openEdit) {
      setNewProduct({
        name: "",
        price: "",
        stock_value: "",
        stock_price: "",
        custom_price: [],
        image: null,
      });
    }
  }, [openEdit]);

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

  return (
    <ThemeProvider theme={mdTheme}>
      {visible ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <MenuShop
            header={"Product " + shop?.shop_name}
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
              <div>
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
              </div>

              <label
                style={{ cursor: "pointer", marginBottom: 10 }}
                onClick={handleOpen}
              >
                เพิ่มสินค้า
              </label>
              <div style={{ width: "100%" }}>
                {product.map((ele, index) => {
                  return (
                    <CardProduct
                      data={ele}
                      onClick={() => {
                        // console.log("edit");
                        // let tmp = ele.price;
                        // let price = tmp[0].price;
                        // tmp.splice(0, 1);
                        setNewProduct({
                          product_id: ele.id,
                          name: ele.product_name,
                          // price: price,
                          stock_value: ele.stock,
                          custom_price: ele.price,
                          image: ele.product_image
                            ? {
                                uri:
                                  process.env.NEXT_PUBLIC_APP_ENPOINT +
                                  "/image/product/" +
                                  ele.product_image,
                              }
                            : null,
                        });
                        handleOpenEdit();
                      }}
                      index={index}
                      key={"product" + index}
                      onClickAddStock={() => {
                        // console.log("click");
                        setNewProduct({
                          product_id: ele.id,
                          name: ele.product_name,
                          price: "",
                          custom_price: [],
                          stock_now: ele.stock,
                          stock_value: "",
                          image: ele.product_image
                            ? {
                                uri:
                                  process.env.NEXT_PUBLIC_APP_ENPOINT +
                                  "/image/product/" +
                                  ele.product_image,
                              }
                            : null,
                        });
                        handleOpenAddStock();
                      }}
                      onClickDelete={() => {
                        Swal.fire({
                          title: "ต้องการลบสินค้าหรือไม่ ?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "ใช่",
                          cancelButtonText: "ไม่ใช่",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteProduct(ele.id);
                          }
                        });
                      }}
                    />
                  );
                })}
              </div>
            </Container>
          </Box>
        </Box>
      ) : (
        "loading"
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "80%" }}>
          <h2 id="child-modal-title">เพิ่มสินค้า</h2>
          <Box
            // component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            style={{ overflow: "scroll", height: "500px" }}
            // noValidate
            // autoComplete="off"
            // onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              //   fullWidth
              id="product_name"
              label="ชื่อสินค้า"
              name="product_name"
              error={newProduct.name == ""}
              autoFocus
              onChange={(value) => {
                // console.log(value);
                setNewProduct({ ...newProduct, name: value.target.value });
              }}
            />
            <TextField
              required
              label="ราคา/ชิ้น"
              name="price"
              error={newProduct.price == ""}
              onChange={(value) => {
                // console.log(value);
                setNewProduct({ ...newProduct, price: value.target.value });
              }}
              id="price"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              //   variant="standard"
            />

            <div>
              <label
                style={{ cursor: "pointer" }}
                onClick={() => {
                  let tmp = [...newProduct.custom_price];
                  tmp.push({ price: "", amount: "" });
                  // console.log(tmp);
                  // console.log(tmpProduct);
                  setNewProduct({ ...newProduct, custom_price: tmp });
                }}
              >
                เพิ่มราคาต่อหลายชิ้น
              </label>
              <div>
                {newProduct.custom_price.map((e, i) => {
                  return (
                    <div
                      key={"custom" + i}
                      style={{
                        display: "flex",
                        marginBottom: 10,
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        required
                        label="จำนวนชิ้น"
                        size={"small"}
                        name="price"
                        value={e.amount}
                        error={e.amount == ""}
                        onChange={(value) => {
                          // console.log(value);
                          let tmp = [...newProduct.custom_price];
                          tmp[i].amount = value.target.value;
                          setNewProduct({
                            ...newProduct,
                            custom_price: tmp,
                          });
                        }}
                        id="price"
                        InputProps={{
                          inputComponent: NumericFormatCustomValue,
                        }}
                        //   variant="standard"
                      />
                      <div style={{ marginLeft: 10 }}>
                        <TextField
                          required
                          size={"small"}
                          label="ราคา"
                          name="price"
                          error={e.price == ""}
                          value={e.price}
                          onChange={(value) => {
                            let tmp = [...newProduct.custom_price];
                            tmp[i].price = value.target.value;
                            setNewProduct({
                              ...newProduct,
                              custom_price: tmp,
                            });
                          }}
                          id="price"
                          InputProps={{
                            inputComponent: NumericFormatCustom,
                          }}
                          //   variant="standard"
                        />
                      </div>
                      <div style={{ marginLeft: 10 }}>
                        <label
                          style={{ cursor: "pointer", color: "#f00" }}
                          onClick={() => {
                            let tmp = [...newProduct.custom_price];
                            tmp.splice(i, 1);
                            console.log("tmp delete", i);
                            setNewProduct({
                              ...newProduct,
                              custom_price: tmp,
                            });
                          }}
                        >
                          ลบ
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <Button variant="contained" component="label">
                รูปสินค้า
                <input
                  type="file"
                  hidden
                  name="image"
                  id="image"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(value) => {
                    //   console.log(value);
                    const [file] = value.target.files;
                    setNewProduct({
                      ...newProduct,
                      image: { file: file, uri: URL.createObjectURL(file) },
                    });
                  }}
                />
              </Button>
              <div>
                {newProduct.image ? (
                  <img
                    src={newProduct.image.uri}
                    alt="product_image"
                    style={{ objectFit: "scale-down" }}
                    height="288"
                  />
                ) : (
                  <img
                    src={require("../../../../public/image/imgNotFound.jpg")}
                    alt="product_image"
                    style={{ objectFit: "scale-down" }}
                    height="288"
                  />
                )}
              </div>
            </div>
            <br />
            <TextField
              required
              label="จำนวน"
              error={newProduct.stock_value == ""}
              name="price"
              onChange={(value) => {
                // console.log(value);
                setNewProduct({
                  ...newProduct,
                  stock_value: value.target.value,
                });
              }}
              id="price"
              InputProps={{
                inputComponent: NumericFormatCustomValue,
              }}
              //   variant="standard"
            />
            <TextField
              required
              error={newProduct.stock_price == ""}
              label="ราคารับมา"
              name="price"
              onChange={(value) => {
                // console.log(value);
                setNewProduct({
                  ...newProduct,
                  stock_price: value.target.value,
                });
              }}
              id="price"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              //   variant="standard"
            />
            <br />
            <Button
              //   type="submit"
              onClick={() => addNewProduct()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เพิ่มสินค้า
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "80%" }}>
          <h2 id="child-modal-title">แก้ไขสินค้า</h2>
          <Box
            // component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            // noValidate
            // autoComplete="off"
            // onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              //   fullWidth
              id="product_name"
              label="ชื่อสินค้า"
              value={newProduct.name}
              name="product_name"
              autoFocus
              onChange={(value) => {
                // console.log(value);
                setNewProduct({ ...newProduct, name: value.target.value });
              }}
            />
            {/* <TextField
              required
              label="ราคา"
              name="price"
              value={newProduct.price}
              onChange={(value) => {
                // console.log(value);
                setNewProduct({ ...newProduct, price: value.target.value });
              }}
              id="price"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              //   variant="standard"
            /> */}
            <div>
              <label
                style={{ cursor: "pointer" }}
                onClick={() => {
                  let tmp = [...newProduct.custom_price];
                  tmp.push({ price: "", amount: "" });
                  // console.log(tmp);
                  // console.log(tmpProduct);
                  setNewProduct({ ...newProduct, custom_price: tmp });
                }}
              >
                เพิ่มราคาต่อหลายชิ้น
              </label>
            </div>
            {newProduct.custom_price.map((e, i) => {
              return (
                <div
                  key={"custom" + i}
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    required
                    label="จำนวนชิ้น"
                    size={"small"}
                    disabled={i == 0}
                    name="price"
                    value={e.amount}
                    error={e.amount == ""}
                    onChange={(value) => {
                      // console.log(value);
                      let tmp = [...newProduct.custom_price];
                      tmp[i].amount = value.target.value;
                      setNewProduct({
                        ...newProduct,
                        custom_price: tmp,
                      });
                    }}
                    id="price"
                    InputProps={{
                      inputComponent: NumericFormatCustomValue,
                    }}
                    //   variant="standard"
                  />
                  <div style={{ marginLeft: 10 }}>
                    <TextField
                      required
                      size={"small"}
                      label="ราคา"
                      name="price"
                      error={e.price == ""}
                      value={e.price}
                      onChange={(value) => {
                        let tmp = [...newProduct.custom_price];
                        tmp[i].price = value.target.value;
                        setNewProduct({
                          ...newProduct,
                          custom_price: tmp,
                        });
                      }}
                      id="price"
                      InputProps={{
                        inputComponent: NumericFormatCustom,
                      }}
                      //   variant="standard"
                    />
                  </div>
                  <div style={{ marginLeft: 10 }}>
                    {i == 0 ? null : (
                      <label
                        style={{ cursor: "pointer", color: "#f00" }}
                        onClick={() => {
                          let tmp = [...newProduct.custom_price];
                          tmp.splice(i, 1);
                          console.log("tmp delete", i);
                          setNewProduct({
                            ...newProduct,
                            custom_price: tmp,
                          });
                        }}
                      >
                        ลบ
                      </label>
                    )}
                  </div>
                </div>
              );
            })}
            <Button variant="contained" component="label">
              รูปสินค้า
              <input
                type="file"
                hidden
                name="image"
                id="image"
                accept="image/png, image/gif, image/jpeg"
                onChange={(value) => {
                  //   console.log(value);
                  const [file] = value.target.files;
                  setNewProduct({
                    ...newProduct,
                    image: { file: file, uri: URL.createObjectURL(file) },
                  });
                }}
              />
            </Button>
            <br />
            {newProduct.image ? (
              <img
                src={newProduct.image.uri}
                alt="product_image"
                style={{ objectFit: "scale-down" }}
                height="288"
              />
            ) : (
              <img
                src={require("../../../../public/image/imgNotFound.jpg")}
                alt="product_image"
                style={{ objectFit: "scale-down" }}
                height="288"
              />
            )}
            <br />
            <Button
              //   type="submit"
              onClick={() => editProduct()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              แก้ไขสินค้า
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openAddStock}
        onClose={handleCloseAddStock}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "80%" }}>
          <h2 id="child-modal-title">เพิ่ม Stock {newProduct.name}</h2>
          <Box
            // component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            // noValidate
            // autoComplete="off"
            // onSubmit={handleSubmit}
          >
            {newProduct.image ? (
              <img
                src={newProduct.image.uri}
                alt="product_image"
                style={{ objectFit: "scale-down" }}
                height="288"
              />
            ) : (
              <img
                src={require("../../../../public/image/imgNotFound.jpg")}
                alt="product_image"
                style={{ objectFit: "scale-down" }}
                height="288"
              />
            )}
            <br />
            <label>จำนวนคงเหลือปัจจุบัน {newProduct.stock_now} ชิ้น</label>
            <br />

            <TextField
              required
              label="จำนวน"
              name="price"
              onChange={(value) => {
                // console.log(value);
                setNewProduct({
                  ...newProduct,
                  stock_value: value.target.value,
                });
              }}
              id="price"
              InputProps={{
                inputComponent: NumericFormatCustomValue,
              }}
              //   variant="standard"
            />
            <TextField
              required
              label="ราคารับมา"
              name="price"
              onChange={(value) => {
                // console.log(value);
                setNewProduct({
                  ...newProduct,
                  stock_price: value.target.value,
                });
              }}
              id="price"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              //   variant="standard"
            />
            <br />
            <Button
              //   type="submit"
              onClick={() => addStock()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เพิ่ม Stock
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};
// export default Shop;

export default connect((state) => state)(withRouter(Product));
