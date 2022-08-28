import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import useStyles from "../../styles";
import StudentFieldData from "./studentformdata";
const errorObj = {
  nameErrorText: "",
  emailErrorText: "",
  ageErrorText: "",
  phoneErrorText: "",
  passwordErrorText: "",
};
const inputField = {
  firstName: "",
  email: "",
  phone: "",
  age: "",
  password: "",
};
const inputType = ["firstName", "email", "age", "phone", "password"];
const emailRegex = "[a-z0-9]+@[a-z]+.[a-z]{2,3}";
const passRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$";
const StudentForm = () => {
  const [input, setInput] = useState({ ...inputField });
  const [errorMessage, setErrorMessage] = useState({ ...errorObj });
  const [submit, setSubmit] = useState(false);
  const classes = useStyles();
  const { firstName, email, phone, age, password } = inputField;
  const formSubmitHandler = (e) => {
    e.preventDefault();
    errorObj.nameErrorText = nameValidityHandler();
    errorObj.emailErrorText = emailValidityHandler();
    errorObj.passwordErrorText = passwordValidityHandler();
    errorObj.ageErrorText = ageValidityHandler();
    errorObj.phoneErrorText = phoneValidityHandler();
    setInput({ ...inputField });
    setErrorMessage({ ...errorObj });
    setSubmit(true);
  };
  const nameValidityHandler = () => {
    if (firstName.length === 0) {
      return "Name cannot be empty";
    }
    return "";
  };
  const emailValidityHandler = () => {
    if (!email.match(emailRegex)) {
      return "Invalid email";
    }
    return "";
  };
  const passwordValidityHandler = () => {
    if (
      (password.length < 8 || password.length > 15) &&
      !password.match(passRegex)
    ) {
      return "Length: 8-15, Must contain a special and uppercase";
    }
    return "";
  };
  const ageValidityHandler = () => {
    if (age.length === 0 || age < 18 || age > 23) {
      return "Age must be between 18-23";
    }
    return "";
  };
  const phoneValidityHandler = () => {
    if (phone.length < 10 || phone.length > 10) {
      return "Invalid number";
    }
    return "";
  };
  const inputHandler = (e, type) => {
    inputField[type] = e.target.value;
    setInput({ ...inputField });
  };
  return (
    <div className={classes.divPos}>
      <Typography variant="h2">Student Registration Form</Typography>
      <div className={classes.widthHalf}>
        <form autoComplete="off">
          <div className={classes.flexBox}>
            {StudentFieldData.map((field, idx) => {
              return (
                <TextField
                  className={classes.widthInput}
                  key={idx}
                  id={`outlined-basic ${idx}`}
                  error={Boolean(errorMessage[field.error].length)}
                  type={field.type}
                  onChange={(e) => {
                    inputHandler(e, inputType[idx]);
                  }}
                  label={field.label}
                  value={input[field.value]}
                  helperText={errorMessage[field.error]}
                  variant="outlined"
                />
              );
            })}
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={formSubmitHandler}
              variant="contained"
              color="primary"
              style={{
                display: "inline-block",
                width: "20%",
                marginTop: "4rem",
              }}
            >
              Submit
            </Button>
          </div>
        </form>
        {submit &&
          !errorMessage.nameErrorText &&
          !errorMessage.emailErrorText &&
          !errorMessage.passwordErrorText &&
          !errorMessage.ageErrorText &&
          !errorMessage.phoneErrorText && (
            <h4 style={{ color: "green" }}>Success</h4>
          )}
      </div>
    </div>
  );
};
export default StudentForm;