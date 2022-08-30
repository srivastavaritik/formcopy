import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import StudentFieldData from "../../data/studentData";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  formentry: {
    justifyContent: "center",
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  buttonstyle: {
    minWidth: "0px",
    marginRight: "20px",
    // marginLeft: '0px',
    padding: "8px",
  },
  input: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

export default function Home() {
  const classes = useStyles();
  const inputType = ["name", "number", "date", "mail", "password"];
  const nameRegex = "^[a-zA-Z]*$";
  const mailRegex = "[a-z0-9]+@[a-z]+.[a-z]{2,3}";
  const mobileRegex = "^[0-9]{10}*$";
  const passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,15}$";
  const dateRegex = "";


    // Leap Year Check not working
    // ^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$
    // \1 is an invalid escape character.
    // ^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;


  // Validation for form
  // let error = [];
  // let [text, setText] = useState("");
  let [input, setInput] = useState({
    name: "",
    number: "",
    date: "",
    mail: "",
    password: "",
  });

  let wrongInput = {
    isName: false,
    isPhone: false,
    isDate: false,
    isMail: false,
    isPass: false,
  };
  const [isError, setIsError] = useState({ ...wrongInput });

  let errorMessage = {
    nameError: "",
    phoneError: "",
    dateError: "",
    mailError: "",
    passError: "",
  };
  const [errorMsg, setErrorMsg] = useState({ ...errorMessage });

  function checkValidate() {
    let errorobj = {};
    let errormsg = {};

    if (!input.name.match(nameRegex) || input.name.length < 3) {
      errorobj.isName = true;
      errormsg.nameError = "Only alphabets allowed.";
    }

    if (!input.mail.match(mailRegex)) {
      errorobj.isMail = true;
      errormsg.mailError = "Invalid mail syntax.";
    }

    if (!input.number.match(mobileRegex)) {
      errorobj.isPhone = true;
      errormsg.phoneError = "Enter a valid 10-digit no.";
    }

    if (!input.date.match(dateRegex)) {
      errorobj.isDate = true;
      errormsg.dateError = "Enter valid date";
    }

    if (!input.password.match(passwordRegex)) {
      errorobj.isPass = true;
      errormsg.passError = "Enter valid password.";
    }

    setIsError({ ...errorobj });
    setErrorMsg({ ...errormsg });
  }

  const inputHandler = (e, type) => {
    let val = e.target.value;
    let temp = { ...input };
    temp[type] = val;
    setInput({ ...temp });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h2">Form</Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac.
        </Typography>
        <br />

        <div className={classes.formentry}>
          <form>
            {StudentFieldData.map((field, idx) => {
              return (
                <TextField
                  key={idx}
                  label={field.label}
                  type={field.type}
                  value={input[field.value]}
                  error={Boolean(isError[field.color])}
                  id={field.id}
                  onChange={(e) => {
                    inputHandler(e, inputType[idx]);
                  }}
                  helperText={errorMsg[field.error]}
                  variant="outlined"
                  placeholder={field.placeholder}
                  InputLabelProps={field.props}
                />
              );
            })}
            
            {/* <TextField
              onChange={(e) => {
                inputHandler(e, "name");
              }}
              error={isError.isName}
              id="outlined-textarea"
              helperText={errorMsg.nameError}
              type="text"
              label="First Name"
              placeholder="Ex: Mohak"
              multiline
              variant="outlined"
            />

            <TextField
              onChange={(e) => {
                inputHandler(e, "number");
              }}
              error={isError.isPhone}
              className={classes.input}
              type="number"
              id="outlined-error-helper-text"
              label="Contact Number"
              helperText={errorMsg.phoneError}
              variant="outlined"
            />

            <TextField
              onChange={(e) => {
                inputHandler(e, "date");

              }}
              id="date"
              error={isError.isDate}
              label="DOB"
              type="date"
              variant="outlined"
              helperText={errorMsg.dateError}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              onChange={(e) => {
                inputHandler(e, "mail");
              }}
              error={isError.isMail}
              helperText={errorMsg.mailError}
              id="outlined-error-helper-text"
              label="Email"
              variant="outlined"
              placeholder="Ex: abc@travclan.com"
            />

            <TextField
              onChange={(e) => {
                inputHandler(e, "password");
              }}
              error={isError.isPass}
              id="outlined-error-helper-text"
              label="Password"
              type="password"
              helperText={errorMsg.passError}
              variant="outlined"
            /> */}
          </form>
        </div>
        <br />

        <Button
          onClick={() => {
            checkValidate();
          }}
          variant="contained"
          size="large"
          color="primary"
        >
          SUBMIT
        </Button>
        <br />
        <br />
      </main>
    </div>
  );
}
