import { makeStyles } from "@material-ui/core";
import React from "react";

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
      </table>
    </>
  );
};

export default StudentList;
