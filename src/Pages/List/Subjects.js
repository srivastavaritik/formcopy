import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "4rem",
  },
  button:{
    margin:"1rem"
  }
}));

const Subjects = () => {
  const [token, setToken] = React.useState("");
  const [apiData, setData] = React.useState([]);
  const params = useParams();
  const { branch, section } = params;
  const classes = useStyles();
  useEffect(() => {
    fetch("https://bpit-att.herokuapp.com/api/auth/admin/login/", {
      method: "POST",
      body: JSON.stringify({
        email: "a@a.com",
        password: "a",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  const getData = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const responseData = await fetch(
      `https://bpit-att.herokuapp.com/api/faculty/subjects/`,
      requestOptions
    );
    const data = await responseData.json();
    console.log(data);
    setData(data);
  };
  useEffect(() => {
    getData();
  });
  const newArr = {};
  return (
    <div className={classes.container}>
      <h1>Subjects</h1>
      {Array.from(apiData).map((data) => (
        <button className={classes.button}>{data.subject_name}</button>
      ))}
    </div>
  );
};

export default Subjects;
