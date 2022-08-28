import Home from './Pages/Home/Home'
import Navbar from './commons/Navbar/Navbar'
import Form from './commons/Form/Form'
import { makeStyles } from "@material-ui/core/styles";
import { Routes, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  app: {
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center', 
    width:'100%'
  }
}))

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form" element={<Form />} />
      </Routes>
      {/* <Home/> */}
      {/* <Form/> */}

      {/* Routes will come here */}
      {/* <Forms/> */}
    </div>
  );
}

export default App;
