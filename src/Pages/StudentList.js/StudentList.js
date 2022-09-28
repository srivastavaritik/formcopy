import { makeStyles } from "@material-ui/core";
import React from "react";
import StudentData from "../../data/studentData";
import SingleStudentRow from "./SingleStudentRow";

const useStyles = makeStyles(() => ({
  table: {
    fontFamily: "Arial",
    borderCollapse: "collapse",
    width: "100%",
  },
  th: {
    border: "1px solid black",
    textAlign: "left",
    padding: ".5rem",
  },
  td: {
    border: "1px solid black",
    textAlign: "left",
    padding: ".5rem",
  },
  "tr:nth-child(even)": {
    backgroundColor: "#4a0053",
  },
}));

const StudentList = ({data}) => {
  console.log("studentList:"+ data[0])
  const classes = useStyles();
  return (
    <>
      <table className={classes.table}>
        <tr className={classes.tr}>
          <th className={classes.th}>Enrollment Number</th>
          <th className={classes.th}>Name</th>
          <th className={classes.th}>Class Roll Number</th>
          <th className={classes.th}>Attandance Count</th>
        </tr>
        {/* {data.map((student) => (
          <SingleStudentRow
            enrollment_number={data.enrollment_number}
            name={data.name}
            class_roll_number={data.class_roll_number}
            attandance_count={data.attandance_count}
          />
        ))} */}
      </table>
    </>
  );
};

export default StudentList;
