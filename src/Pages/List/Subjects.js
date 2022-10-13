import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../commons/Navbar/Navbar";

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
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }, []);
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
    <>
    <Navbar/>
      <div className={classes.container}>
        <h1>Subjects</h1>
        {Array.from(apiData).map((data) => (
          <button className={classes.button}>{data.subject_name}</button>
        ))}
      </div>
    </>
  );
};

export default Subjects;
