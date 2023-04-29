import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        day: "Monday",
        Login: "9:30",
        Logout: "5:30",
        TotalTime: "8",
      },
      {
        date: "2020-01-02",
        day: "Tuesday",
        Login: "9:30",
        Logout: "5:30",
        TotalTime: "8",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Working hour history
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Login Time</TableCell>
                    <TableCell align="right">Logout Time</TableCell>
                    <TableCell align="right">Total Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date} {historyRow.day}
                      </TableCell>
                      <TableCell>{historyRow.Login}</TableCell>
                      <TableCell align="right">{historyRow.Logout}</TableCell>
                      <TableCell align="right">
                        {historyRow.TotalTime}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.string.isRequired,
    carbs: PropTypes.string.isRequired,
    fat: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    protein: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData("Mohak", "9:30", "5:30", "8"),
  createData("Ankit Fukte", "9:30", "5:30", "8"),
  createData("Jatin", "9:30", "5:30", "8"),
  createData("Durgesh Rajak", "9:30", "5:30", "8"),
  createData("Vikas Pandey", "9:30", "5:30", "8"),
  createData("Ayush Sharma", "9:30", "5:30", "8"),
];

export default function Timestamp() {
  return (
    <TableContainer component={Paper} style={{backgroundColor:"#141b2d"}}>
      <Table aria-label="collapsible table" >
        <TableHead style={{backgroundColor:"#3e4396"}}>
          <TableRow>
            <TableCell />
            <TableCell >Employee Name</TableCell>
            <TableCell align="right">Login Time</TableCell>
            <TableCell align="right">Logout Time</TableCell>
            <TableCell align="right">Total Time</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}