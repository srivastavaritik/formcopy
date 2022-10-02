import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  
  th:{
    border:"3px solid red"
  },
  td: {
    border: "2px solid red",
    textAlign: "left",
    padding: ".75rem",
  },
  "tr:nth-child(even)": {
    backgroundColor: "#4a0053",
  },
}));

const SingleStudentRow = (props) => {
  const classes = useStyles();
  return (
    <tr className={classes.tr}>
      <td className={classes.td}>{props.enrollment_number}</td>
      <td className={classes.td}>{props.name}</td>
      <td className={classes.td}>{props.class_roll_number}</td>
      <td className={classes.td}>{props.attandance_count}</td>

    </tr>
  );
};

export default SingleStudentRow;
