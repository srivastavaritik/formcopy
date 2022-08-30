import CssBaseline from "@material-ui/core/CssBaseline";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import InfiniteScroll from "react-infinite-scroller";
// import {useEffectOnce} from "../../hooks/UseEffectOnce"



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

    demo: {
    backgroundColor: theme.palette.background.paper,
    marginLeft: 20,
    height: "50vh",
    width: "80vh",
    overflow: "auto",
  },
}));

export default function TableCopy() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const axios = require("axios");
  const [objdata, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [more, setMore] = useState(true);
  async function getApiData() {
    if (count == 10) {
      setMore(false);
    }
    let url = `https://jsonplaceholder.typicode.com/photos?_page=${count}&_limit=10`;
    let res = await axios.get(url);
    let data = res.data;
    console.log(data);
    setData([...objdata, ...data]);
    setCount(count + 1);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {/* <Typography variant="h6" className={classes.title}>
            Text only
          </Typography> */}
            <div className={classes.demo}>
              <InfiniteScroll
                pageStart={0}
                loadMore={getApiData}
                hasMore={more}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
                useWindow={false}
              >
                <List dense={dense}>
                  {objdata.length == 0 ? (
                    <></>
                  ) : (
                    objdata.map((item) => (
                      <ListItem>
                        <ListItemText
                          primary={item.id + "  " + item.title}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
              </InfiniteScroll>
            </div>
          </Grid>
        </Grid>
        <br />
        <br />

      </main>
      
    </div>
  );
}
