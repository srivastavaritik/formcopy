import React, { useState } from "react";
import {useEffectOnce} from "../../hooks/UseEffectOnce"
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MenuItem } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import Toolbar from "@material-ui/core/Toolbar";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";

import axios from 'axios';
import Navbar from "../Navbar/Navbar";

// import Table from "../../commons/Table/Table";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      // width: 200,
    },
  },
  textField: {
    width: "30ch",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
    },
  },
  toolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  container: {
    margin: "auto",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: "60px",
    paddingBottom: "0px",
    height: "40vh",
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
  },
  submit: {
    // textAlign: "center",
    // alignItems: "center",
    marginTop: "40px",
    display: "flex",
    justifyContent: "center"
  },
  paper: {
    width: "85vw",
    marginBottom: theme.spacing(2),
  },
  // tablecontainer: {
  //   maxWidth: "100%",
  // },
  table: {
    // minWidth: 750,
    width:'800px',
    [theme.breakpoints.up('sm')]: {
      width:'100vw',
    },
  },

}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const DEFAULT_ERROR_OBJ = {
  name: {
    isErr: false,
    msg: "only alphabets allowed",
  },
  status: {
    isErr: false,
    msg: "please select a status",
  },
  email: {
    isErr: false,
    msg: "email should contain @ ",
  },
  gender: {
    isErr: false,
    msg: "please select a gender",
  },
};
export default function LayoutTextFields() {
  const classes = useStyles();
  const [input, setInput] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const [Msg, setMsg] = useState("");
  const [open, setOpen] = React.useState(false);
  const [objdata, setData] = useState([]);
  const [err, setError] = useState(
    JSON.parse(JSON.stringify(DEFAULT_ERROR_OBJ))
  );
  const [isPatch, setPatch] = useState(false);
  const nameRegex = "^[a-zA-Z]*$";
  const mailRegex = "[a-z0-9]+@[a-z]+.[a-z]{2,3}";
  const token =
    "Bearer 6e420cc8cbca97712c81179c5e7e2ed404feaf35b632a4c7c591ff62d2c1b948";

  


  const handleData = (event, inputField) => {
    const val = event.target.value;
    let tempObj = { ...input };
    tempObj[inputField] = val;
    setInput({ ...tempObj });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function checkValidate() {
    let newobj = JSON.parse(JSON.stringify(DEFAULT_ERROR_OBJ));
    let isChange = false;
    if (!input.name.match(nameRegex) || input.name.length < 3) {
      isChange = true;
      newobj["name"].isErr = true;
    }
    if (input.gender.length === 0) {
      isChange = true;
      newobj["gender"].isErr = true;
    }
    if (input.status.length === 0) {
      isChange = true;
      newobj["status"].isErr = true;
    }
    if (!input.email.match(mailRegex)) {
      isChange = true;
      newobj["email"].isErr = true;
    }

    setError(JSON.parse(JSON.stringify(newobj)));
    if (isPatch === false) {
      if (isChange === false) {
        postandGet();
        setMsg("Successfully Submitted");
        handleClick();
        // getApiData();
      } else {
        setMsg("ERROR: Fill the form properly.");
        handleClick();
      }
    } else {
      if (isChange === false) {
        patchApiData();
        setMsg("Successfully Submitted");
        handleClick();
        // getApiData();
      } else {
        setMsg("ERROR: No changes found.");
        handleClick();
      }
    }
    newForm();
  }

  async function getApiData() {
    let res = await axios.get("https://gorest.co.in/public/v2/users/", {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    let data = res.data;
    setData(data);
  }

  const postandGet = async () => {
    try {
      const res = await axios.post(
        "https://gorest.co.in/public/v2/users",
        input,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        }
      );
      if (res.status === 201) {
        setData([res.data, ...objdata]);
        //  getApiData();
      }
    } catch (err) {
      handleClick();
    }
  };

  const newForm = () => {
    setInput({
      name: "",
      email: "",
      gender: "",
      status: "",
    });
    setPatch(false);
  };

  const handleEdit = async (row) => {
    try {
      let res = await axios.get(
        `https://gorest.co.in/public/v2/users/${row.id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setInput(res.data);
      }
    } catch (err) {
      console.log(err);
    }
    setPatch(true);
  };

  const patchApiData = async () => {
    try {
      const res = await axios.patch(
        `https://gorest.co.in/public/v2/users/${input.id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        getApiData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.delete(
        `https://gorest.co.in/public/v2/users/${row.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (res.status === 204) {
        getApiData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffectOnce(() => {
    getApiData();
  }, []);

  return (
    <>
    <Navbar/>
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.container}>
            <TextField
              label={`Enter name`}
              variant="outlined"
              error={err["name"].isErr}
              className={classes.textField}
              helperText={err["name"].isErr === true ? err["name"].msg : ""}
              margin="normal"
              onChange={(event) => {
                handleData(event, "name");
              }}
              value={input.name}
            ></TextField>
            <TextField
              label={`Enter Email`}
              variant="outlined"
              error={err["email"].isErr}
              className={classes.textField}
              helperText={err["email"].isErr === true ? err["email"].msg : ""}
              margin="normal"
              onChange={(event) => {
                handleData(event, "email");
              }}
              value={input.email}
            ></TextField>
            <TextField
              label={`Select Gender`}
              variant="outlined"
              select
              error={err["gender"].isErr}
              className={classes.textField}
              helperText={err["gender"].isErr === true ? err["gender"].msg : ""}
              margin="normal"
              onChange={(event) => {
                handleData(event, "gender");
              }}
              value={input.gender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
            <TextField
              label={`Select Status`}
              variant="outlined"
              select
              error={err["status"].isErr}
              className={classes.textField}
              helperText={err["status"].isErr === true ? err["status"].msg : ""}
              margin="normal"
              onChange={(event) => {
                handleData(event, "status");
              }}
              value={input.status}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </div>
          <div className={classes.submit}>
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

            <Button
              onClick={newForm}
              variant="contained"
              size="large"
              color="primary"
            >
              NEW FORM
            </Button>
            <br />
            <br />
          </div>

          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={Msg}
            severity="success"
          />

          <br />
          <br />

          {/* <Table /> */}

          {objdata.length === 0 ? (
            <></>
          ) : (
            <Paper className={classes.paper}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="">Email</StyledTableCell>
                      <StyledTableCell align="">Gender</StyledTableCell>
                      <StyledTableCell align="">Status</StyledTableCell>
                      <StyledTableCell align="">Edit</StyledTableCell>
                      <StyledTableCell align="">Delete</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {objdata.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell>{row.email}</StyledTableCell>
                        <StyledTableCell>{row.gender}</StyledTableCell>
                        <StyledTableCell>{row.status}</StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            value={row.id}
                            aria-label="edit"
                            className={classes.margin}
                            onClick={() => {
                              handleEdit(row);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            value={row.id}
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => {
                              handleDelete(row);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </main>
      </div>
    </>
  );
}
