import axios from "axios";
import md5 from "md5";
let api = axios.create({
  baseURL: "/",
  timeout: 100000,
});
const create = () => {
  const signIn = async (data) => {
    let user = {
      username: data.username,
      password: md5(data.password),
    };
    console.log(user);
    return api.post("login", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const getShop = (id) => {
    return api.post(
      "getShop",
      { id: id },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };
  const getPermission = (admin_id, shop_id) => {
    return api.post(
      "getPermission",
      { admin_id: admin_id, shop_id: shop_id },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };
  const getProduct = (id, stock = false) => {
    return api.post(
      "getProduct",
      { id: id, in_stock: stock },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };
  const addNewProduct = (data) => {
    return api.post("addNewProduct", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const editProduct = (data) => {
    // console.log(data);
    return api.post("editProduct", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const editProductWithImage = (data) => {
    return api.post("editProductWithImage", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const addStock = (data) => {
    // console.log(data);
    return api.post("addStock", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const getOrder = (data) => {
    return api.post("getOrder", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const getOrderDetail = (data) => {
    return api.post("getOrderDetail", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const getHistoryDetail = (data) => {
    return api.post("getHistoryDetail", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const deleteProduct = (data) => {
    return api.post("deleteProduct", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const removeOrderProduct = (data) => {
    return api.post("removeOrderProduct", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const addItem = (data) => {
    return api.post("addItem", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const addNewOrder = (data) => {
    return api.post("addNewOrder", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const deleteOrder = (data) => {
    return api.post("deleteOrder", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const paidOrder = (data) => {
    return api.post("paidOrder", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const dailyReport = (data) => {
    return api.post("dailyReport", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const weeklyReport = (data) => {
    return api.post("weeklyReport", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const monthlyReport = (data) => {
    return api.post("monthlyReport", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const dailyReportDetail = (data) => {
    return api.post("dailyReportDetail", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  //   deleteProduct;
  return {
    signIn,
    getShop,
    getPermission,
    getProduct,
    addNewProduct,
    editProduct,
    editProductWithImage,
    addStock,
    getOrder,
    getOrderDetail,
    deleteProduct,
    removeOrderProduct,
    addItem,
    addNewOrder,
    deleteOrder,
    paidOrder,
    getHistoryDetail,
    dailyReport,
    weeklyReport,
    monthlyReport,
    dailyReportDetail,
  };
};
export default {
  create,
};
