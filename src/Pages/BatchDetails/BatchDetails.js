import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import OutlinedCard from "../../commons/BatchCard/OutlinedCard";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "4rem",
  },
  headLine: {
    fontSize: "2rem",
    fontFamily: "system-ui",
    fontWeight: "bold",
    left: "10%",
    border: "1px solid black",
    padding: ".5rem",
    marginTop: "1rem",
  },
  batchContainer: {
    marginTop: "2rem",
    display: "flex",
    width: "80vw0",
    flexWrap: "wrap",
    flexShrink: "3",
    margin: "auto",
  },
  batchName: {
    margin: "auto",
  },
}));

const BatchDetails = () => {
  const classes = useStyles();
  const [token, setToken] = React.useState("");
  const [apiData, setData] = React.useState([]);

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
      "https://bpit-att.herokuapp.com/api/faculty/subjects/",
      requestOptions
    );
    const data = await responseData.json();
    console.log(data);
    setData(data);
  };
  useEffect(() => {
    getData();
  });
  const AllBatches = new Set();
  Array.from(apiData).map((data) => (
    AllBatches.add(data.branch_name)
  ));
  return (
    <div className={classes.container}>
      <div className={classes.headLine}>BATCH DETAILS</div>
      <div className={classes.batchContainer}>
        {Array.from(AllBatches).map(batch => (
          <span className={classes.batchName}>
            <OutlinedCard name={batch} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default BatchDetails;
