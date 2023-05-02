import moment from "moment";
const monthsFull = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
const monthsShort = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];
export default {
  setItem(name, value) {
    if (typeof window !== "undefined") window.localStorage.setItem(name, value);
  },
  getItem(name) {
    if (typeof window !== "undefined") return window.localStorage.getItem(name);
  },
  removeItem(name) {
    if (typeof window !== "undefined") window.localStorage.removeItem(name);
  },

  setUTC(datetime) {
    let year = parseInt(moment(datetime).format("YYYY"));
    let dd = moment(datetime).get("date");
    let month = moment(datetime).get("month");
    let h = moment(datetime).format("HH");
    let m = moment(datetime).format("mm");
    let date;
    date = new Date(Date.UTC(year, month, dd, h, m));
    return date;
  },
  setTime(datetime, min, hour, day, month, year) {
    let date = new Date(datetime);
    if (min) {
      date.setMinutes(date.getMinutes() + min);
    }
    if (hour) {
      date.setHours(date.getHours() + hour);
    }
    if (day) {
      date.setDate(date.getDate() + day);
    }
    if (month) {
      date.setMonth(date.getMonth() + month);
    }
    if (year) {
      date.setFullYear(date.getFullYear() + year);
    }
    return date;
  },
  momentTime(datetime, utc = false) {
    let year = parseInt(moment(datetime).format("YYYY"));
    let dd = moment(datetime).get("date");
    let month = moment(datetime).get("month");
    let h = moment(datetime).format("HH");
    let m = moment(datetime).format("mm");
    let date;
    if (utc) {
      date = new Date(Date.UTC(year, month, dd, h, m));
    } else {
      date = new Date(year, month, dd, h, m);
    }

    if (date) {
      let time = moment(date).format("HH:mm");
      return time + " น.";
    } else {
      return "-";
    }
  },
  momentDate(datetime, type = "short", disableYear = true, utc = false) {
    if (datetime !== null) {
      if (utc) datetime = moment(datetime).add(7, "hours");
      let year = parseInt(moment(datetime).format("YYYY")) + 543;
      let dd = moment(datetime).get("date");
      let month;
      if (type == "short") {
        month = monthsShort[moment(datetime).get("month")];
      } else {
        month = monthsFull[moment(datetime).get("month")];
      }
      return dd + " " + month + " " + `${disableYear ? year : ""}`;
    } else {
      return "-";
    }
  },
  momentDateTime(datetime, type = "short", utc = true) {
    // console.log(datetime);
    // datetime += '+7000';
    let year = parseInt(moment(datetime).format("YYYY"));
    let dd = moment(datetime).get("date");
    let month = moment(datetime).get("month");
    let h = moment(datetime).format("HH");
    let m = moment(datetime).format("mm");
    let date;
    if (utc) {
      date = new Date(Date.UTC(year, month, dd, h, m));
    } else {
      date = new Date(year, month, dd, h, m);
    }

    if (date) {
      let year = parseInt(moment(date).format("YYYY")) + 543;
      let dd = moment(date).get("date");
      let month;
      if (type == "short") {
        month = monthsShort[moment(date).get("month")];
      } else {
        month = monthsFull[moment(date).get("month")];
      }
      let time = moment(date).format("HH:mm");
      return dd + " " + month + " " + year + " " + time + " น.";
    } else {
      return "-";
    }
  },
  setDateLocale(datetime) {
    if (datetime.toString().includes(`GMT+0700`)) {
      return new Date(datetime);
    } else {
      let year = parseInt(moment(datetime).format("YYYY"));
      let dd = moment(datetime).get("date");
      let month = moment(datetime).get("month");
      let h = moment(datetime).format("HH");
      let m = moment(datetime).format("mm");
      let date = new Date(Date.UTC(year, month, dd, h, m));
      return date;
    }
  },
  momentTwoDate(startDate, endDate, type = "short") {
    let start = this.setDateLocale(startDate);
    let end = this.setDateLocale(endDate);
    let year = parseInt(moment(start).format("YYYY")) + 543;
    let dd = moment(start).get("date");
    let month;
    if (type == "short") {
      month = monthsShort[moment(start).get("month")];
    } else {
      month = monthsFull[moment(start).get("month")];
    }

    let yearEnd = parseInt(moment(end).format("YYYY")) + 543;
    let ddEnd = moment(end).get("date");
    // let monthEnd = monthsShort[moment(end).get('month')];
    let monthEnd;
    if (type == "short") {
      monthEnd = monthsShort[moment(end).get("month")];
    } else {
      monthEnd = monthsFull[moment(end).get("month")];
    }
    if (monthEnd === month) {
      if (dd === ddEnd) {
        return dd + " " + month + " " + year;
      } else {
        return dd + " - " + ddEnd + " " + month + " " + year;
      }
    } else {
      if (year === yearEnd) {
        return dd + " " + month + " - " + ddEnd + " " + monthEnd + " " + year;
      } else {
        return (
          dd +
          " " +
          month +
          " " +
          year +
          " - " +
          ddEnd +
          " " +
          monthEnd +
          " " +
          year
        );
      }
    }
  },
  numberWithCommas(price) {
    let x = parseFloat(price).toFixed(2);
    // return x.toLocaleString('en-US', {
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2,
    // });
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  numberWithCommasNoFloat(price) {
    let x = parseInt(price);
    // return x.toLocaleString('en-US', {
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2,
    // });
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  addComma(item) {
    if (item == 0) {
      return item;
    }
    if (item) {
      let num = item;
      let commas = num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return commas;
    }
  },
};
