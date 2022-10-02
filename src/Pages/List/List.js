import React from 'react'
import { makeStyles } from "@material-ui/core";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import SingleStudentRow from '../StudentList.js/SingleStudentRow';

const useStyles = makeStyles(() => ({
  table: {
    fontFamily: "Arial",
    borderCollapse: "collapse",
    width: "80vw",
  },
  th: {
    border: "2px solid black",
    textAlign: "left",
    padding: "1rem",
  },
  td: {
    border: "2px solid black",
    textAlign: "left",
    padding: "1rem",
  },
  "tr:nth-child(even)": {
    backgroundColor: "#4a0053",
  },
}));

const List = () => {
    const params = useParams();
    const {branch, section} = params;
    
    const [token, setToken] = React.useState("");
    const [apiData, setData] = React.useState([]);

    useEffect(() => {
      setToken(JSON.parse(localStorage.getItem('user')).token)
    },[]);
    const getData = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      const responseData = await fetch(
        `https://bpit-att.herokuapp.com/api/student/attendance/list?batch=2023&branch=027&subject=ETMA-101&section=${section}`,
        requestOptions
      );
      const data = await responseData.json();
      console.log(data);
      setData(data);
    };
    useEffect(() => {
      getData();
    });
    const classes = useStyles();

    return (
      <div style={{marginTop:"5rem"}}>
        <table className={classes.table}>
          <tr className={classes.tr}>
            <th className={classes.th}>Enrollment Number</th>
            <th className={classes.th}>Name</th>
            <th className={classes.th}>Class Roll Number</th>
            <th className={classes.th}>Attandance Count</th>
          </tr>
          {Array.from(apiData).map((student) => (
          <SingleStudentRow
            enrollment_number={student.enrollment_number}
            name={student.name}
            class_roll_number={student.class_roll_number}
            attandance_count={student.attendance_count}
          />
        ))}
        </table>
      </div>
    );
}

export default List