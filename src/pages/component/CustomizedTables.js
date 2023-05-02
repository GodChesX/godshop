import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Swal from "sweetalert2";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import helper from "../../utils/helper";
import PaidIcon from "@mui/icons-material/Paid";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function CustomizedTables(props) {
  console.log(props);
  const {
    data,
    onClick,
    clickDelete,
    print = false,
    clickPrint,
    paid = false,
    clickPaid,
    showDelete = true,
  } = props;
  const field = data.column.map((ele) => ele.field);
  const field_type = data.column.map((ele) => ele.type);

  // console.log(field);
  const confirm = (id) => {
    Swal.fire({
      title: "ต้องการลบรายการหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then((result) => {
      if (result.isConfirmed) {
        clickDelete(id);
      }
    });
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ลำดับ</StyledTableCell>
              {data.column.map((col, index) => {
                return (
                  <StyledTableCell key={"col" + index}>
                    {col.name}
                  </StyledTableCell>
                );
              })}
              {print || paid || showDelete ? (
                <StyledTableCell></StyledTableCell>
              ) : null}
              {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((ele, index) => (
              <TableRow key={"row" + index} hover sx={{ cursor: "pointer" }}>
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => {
                    onClick(ele.id, index);
                  }}
                >
                  {index + 1}
                </TableCell>
                {field.map((e, i) => {
                  return (
                    <TableCell
                      key={index + e}
                      onClick={() => {
                        onClick(ele.id, index);
                      }}
                    >
                      {field_type[i] == "datetime"
                        ? helper.momentDateTime(ele[e], "short", false)
                        : ""}
                      {field_type[i] == "str"
                        ? ele[e] !== null && ele[e] !== ""
                          ? ele[e]
                          : "-"
                        : ""}
                      {field_type[i] == "image" ? (
                        ele[e] !== null ? (
                          <img
                            src={
                              process.env.NEXT_PUBLIC_APP_ENPOINT +
                              "/image/product/" +
                              ele[e]
                            }
                            alt="product_image"
                            style={{ objectFit: "scale-down" }}
                            height="100"
                          />
                        ) : (
                          <img
                            src={require("../../../public/image/imgNotFound.jpg")}
                            alt="product_image"
                            style={{ objectFit: "scale-down" }}
                            height="100"
                          />
                        )
                      ) : (
                        ""
                      )}
                      {field_type[i] == "int"
                        ? helper.numberWithCommasNoFloat(ele[e])
                        : ""}
                      {/* // ? helper.momentDateTime(ele[e], "short", false) // :
                    ele[e] == null // ? "-" // : ele[e]} */}
                    </TableCell>
                  );
                })}
                {/* <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                {showDelete || paid || print ? (
                  <TableCell component="th" scope="row">
                    {paid ? (
                      <PaidIcon
                        onClick={() => {
                          clickPaid(ele.id);
                        }}
                        style={{ marginRight: 10 }}
                      />
                    ) : null}
                    {print ? (
                      <LocalPrintshopIcon
                        onClick={() => {
                          clickPrint(ele.id);
                        }}
                        style={{ marginRight: 10 }}
                      />
                    ) : null}
                    {showDelete ? (
                      <DeleteTwoToneIcon
                        sx={{ color: "#F00" }}
                        onClick={() => {
                          confirm(ele.id);
                        }}
                      />
                    ) : null}
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
