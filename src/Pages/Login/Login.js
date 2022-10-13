import { Button, makeStyles, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const useStyles = makeStyles(() => ({
  form: {
    margin: "auto",
    background: "#b7c2d236",
    marginTop: "7rem",
    padding: "4rem",
    borderRadius: "1.5rem",
    boxShadow: "1px 1px 1rem",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
  },
  mb_3: {
    marginBottom: "2rem",
  },
}));

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const data = localStorage.getItem("user");
      const objData = JSON.parse(data);
      if (objData.token) {
        navigate("/dashboard");
      }
    }
  }, []);
  const loginHandler = async (e) => {
    e.preventDefault();
    let result = await fetch(
      "https://bpit-att.herokuapp.com/api/auth/admin/login/",
      {
        method: "POST",
        body: JSON.stringify({
          email: email.toString(),
          password: password.toString(),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result));
    localStorage.setItem(
      "user_name",
      JSON.parse(localStorage.getItem("user")).name
    );
    localStorage.setItem("isLoggedIn", true);
    const data = localStorage.getItem("user");
    const objData = JSON.parse(data);
    if (objData.token) {
      navigate("/dashboard");
    }
  };
  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={loginHandler}>
      <h3 className={classes.heading}>Sign In</h3>
      <div className={classes.mb_3}>
        <TextField
          id="standard-basic"
          label="Email"
          onChange={emailChangeHandler}
          value={email}
          variant="standard"
        />
      </div>
      <div className={classes.mb_3}>
        <TextField
          id="standard-basic"
          label="Password"
          onChange={passwordChangeHandler}
          value={password}
          variant="standard"
        />
      </div>
      <div className={classes.grid}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Login;
