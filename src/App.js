import Home from './Pages/Home/Home'
import Navbar from './commons/Navbar/Navbar'
// import Form from './commons/Form/Form'
import FormPut from './commons/Form/FormPut'
import Responses from './Pages/Responses/Responses'
import Gallery from './commons/Gallery/Gallery'
import { makeStyles } from "@material-ui/core/styles";
import {
  Route,
  Routes,
} from "react-router-dom";
import BatchDetails from './Pages/BatchDetails/BatchDetails'
import List from './Pages/List/List'
import Subjects from './Pages/List/Subjects'
import Login from './Pages/Login/Login'

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
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/form" element={<FormPut />} />
        <Route path="/responses" element={<Responses />} />
        <Route path="/infinite" element={<Gallery />} />
        <Route path="/batch-details" element={<BatchDetails />} />
        <Route
          path="/batch-details/:branch/:section/subjects/students-lists"
          element={<List />}
        />
        <Route
          path="/batch-details/:branch/:section/subjects"
          element={<Subjects />}
        />
      </Routes>
    </div>
  );
}

export default App;
