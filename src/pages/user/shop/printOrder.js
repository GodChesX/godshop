import React, { useRef, useEffect, useState } from "react";
// import ReactToPrint from "react-to-print";
import { render } from "react-dom";
import { connect } from "react-redux";
import { withTranslation } from "../../../../i18n";
import { withRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
// import ComponentToPrint from "./ComponentToPrint";
import api from "../../../utils/api";
const API = api.create();
import helper from "../../../utils/helper";
const PrintOrder = (props) => {
  console.log(props.router.query.order_id);
  const componentRef = useRef();
  const [admin, setAdmin] = React.useState(JSON.parse(helper.getItem("admin")));
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState({ column: [], data: [] });
  const [shop, setShop] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  React.useEffect(() => {
    if (!admin) {
      window.location.href = "/";
    } else {
      if (props.router.query.id) {
        API.getPermission(admin.id, props.router.query.id)
          .then((response) => {
            setShop(response.data.result);

            setVisible(true);
            console.log(response.data.result);
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
  useEffect(() => {
    if (orderDetail) {
      handlePrint();
    }
  }, [orderDetail]);

  useEffect(() => {
    if (visible) {
      getOrderDetail(props.router.query.order_id);
      //   console.log(shop.shop_name);
    }
  }, [visible]);
  const getOrderDetail = (id) => {
    // console.log({ shop_id: shop.id });
    API.getOrderDetail({ order_id: id })
      .then((response) => {
        console.log(response);
        setOrderDetail(response.data.result);
        // setOrder(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "ไม่พบรายการสั่งซื้อ",
          timer: 1000,
        }).then(() => {
          window.location.href = "/shop/" + shop.id + "/order/";
        });
        //   window.location.href = "/";
      });
  };
  return (
    <div>
      {/* <button onClick={handlePrint}>Print this out!</button> */}
      <div ref={componentRef}>
        {visible ? (
          <div
            style={{
              width: 250,
              backgroundColor: "white",
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={
                  shop?.logo
                    ? process.env.NEXT_PUBLIC_APP_ENPOINT +
                      "/image/product/" +
                      shop?.logo
                    : require("../../../../public/image/logo.png")
                }
                style={{ width: "50%" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 10,
                //   justifyContent: "space-between",
              }}
            >
              <label
                style={{
                  display: "flex",
                  flex: 0.5,
                  fontSize: 14,
                  //   justifyContent: "end",
                }}
              >
                ชื่อสินค้า
              </label>
              <label
                style={{
                  display: "flex",
                  flex: 0.2,
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                ราคา
              </label>
              <label
                style={{
                  display: "flex",
                  flex: 0.15,
                  justifyContent: "end",
                  fontSize: 14,
                }}
              >
                จำนวน
              </label>
              <label
                style={{
                  display: "flex",
                  flex: 0.2,
                  justifyContent: "end",
                  fontSize: 14,
                }}
              >
                รวม
              </label>
            </div>
            {orderDetail?.order_data.data.map((e, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: 10,
                    paddingRight: 10,
                    //   justifyContent: "space-between",
                  }}
                  key={"product" + i}
                >
                  <label
                    style={{
                      display: "flex",
                      flex: 0.45,
                      fontSize: 14,
                      //   justifyContent: "end",
                    }}
                  >
                    {e.product_name}
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flex: 0.2,
                      justifyContent: "center",
                      fontSize: 14,
                    }}
                  >
                    {helper.numberWithCommasNoFloat(e.price)}
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flex: 0.15,
                      justifyContent: "end",
                      fontSize: 14,
                    }}
                  >
                    {e.total}
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flex: 0.2,
                      justifyContent: "end",
                      fontSize: 14,
                    }}
                  >
                    {helper.numberWithCommasNoFloat(e.total_price)}
                  </label>
                </div>
              );
            })}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <div style={{ paddingRight: 5 }}>รวมทั้งหมด</div>
              <div style={{ paddingLeft: 5 }}>
                {helper.numberWithCommasNoFloat(orderDetail?.order.price)} บาท
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={
                  shop?.logo
                    ? process.env.NEXT_PUBLIC_APP_ENPOINT +
                      "/image/product/" +
                      shop?.logo
                    : require("../../../../public/image/defaultQRcode.png")
                }
                style={{ width: "50%" }}
              />
            </div>
          </div>
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};
export default connect((state) => state)(withRouter(PrintOrder));
