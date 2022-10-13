import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TableCopy from "../../commons/Table/TableCopy";
import Navbar from "../Navbar/Navbar";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },

  toolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

export default function Gallery() {
  const classes = useStyles();

  return (
    <>
    <Navbar/>
      <div className={classes.root}>
        <CssBaseline />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="h2">Infinite Scroll</Typography>
          <Typography paragraph>
            Infinite Scroll with dummy data being recived from an API.
          </Typography>
          <br />
          <br />
          <TableCopy />
        </main>
      </div>
    </>
  );
}
