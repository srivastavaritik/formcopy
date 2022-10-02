import { makeStyles } from '@material-ui/core'
import {useNavigate} from 'react-router-dom'
import React, {useEffect} from 'react'

const useStyles = makeStyles(() => ({
    form:{
        height:"70vh",
        marginTop:"7rem",
        margin:"auto"
    },
    heading:{
        fontSize:"2rem",
        fontWeight:"bold"
    }
}))

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordChangeHandler = (e) => {
      setPassword(e.target.value);
    };

    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('user'))
        {
            const data = localStorage.getItem("user");
            const objData = JSON.parse(data);
            if (objData.token) {
              navigate("/dashboard");
            }
        }
    }, []);
    const loginHandler = async(e) => {
        e.preventDefault();
        let result = await fetch("https://bpit-att.herokuapp.com/api/auth/admin/login/", {
          method: "POST",
          body: JSON.stringify({
            email: email.toString(),
            password: password.toString(),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        result = await result.json();
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem(
          "user_name",
          JSON.parse(localStorage.getItem("user")).name
        );
        localStorage.setItem("isLoggedIn",true);
        const data = localStorage.getItem("user");
        const objData = JSON.parse(data);
        if (objData.token) {
          navigate("/dashboard");
        }
    }
    const classes = useStyles();
    return (
      <form className={classes.form} onSubmit={loginHandler}>
        <h3 className={classes.heading}>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            onChange={emailChangeHandler}
            value={email}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
          value={password}
          onChange={passwordChangeHandler}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" >
            Submit
          </button>
        </div>
      </form>
  )
}

export default Login