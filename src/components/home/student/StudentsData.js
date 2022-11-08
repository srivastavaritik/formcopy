import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function createData(name, eroll, classRoll, branch, group, batch) {
  return { name, eroll, classRoll, branch, group, batch };
}

export default function StudentsData() {
  const [objData, setObjData] = React.useState([]);
  const [rows, setRows] = React.useState([
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  ]);
  const config = {
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
  };
  React.useEffect(() => {
    axios
      .get(
        `https://bpit-att.herokuapp.com/api/student/profile/search?query=`,
        config
      )
      .then((res) => {
        const persons = res.data;
        persons.forEach((element) => {
            // setRows(...createData(element.name, 159, 6.0, 24, 4.0),);
            // console.log(element);
        });
        setObjData(persons);
        //   console.log(persons);
      });
  }, []);

  // objData.forEach((element) => console.log(element));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Student's Name</TableCell>
            <TableCell align="left">E.Roll</TableCell>
            <TableCell align="right">Class Roll</TableCell>
            <TableCell align="right">Branch</TableCell>
            <TableCell align="right">Group</TableCell>
            <TableCell align="right">Batch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objData.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.enrollment_number}</TableCell>
              <TableCell align="right">{row.class_roll_number}</TableCell>
              <TableCell align="right">{row.branch}</TableCell>
              <TableCell align="right">{row.student_group}</TableCell>
              <TableCell align="right">{row.batch}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
