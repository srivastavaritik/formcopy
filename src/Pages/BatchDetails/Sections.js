import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(() => ({
    container:{
        marginTop:"4rem"
    }
}));

const Sections = (props) => {
    const classes = useStyles();
    const [branch, setBranch] = React.useState("");
    if(props.name==="Computer Science and Engineering")
    {
        setBranch("CSE");
    }
  return (
    <div className={classes.container}>
      <h1>{props.name}</h1>
      <button>{branch}-A</button>
      <button>{branch}-B</button>
      <button>{branch}-C</button>
    </div>
  );
}

export default Sections