import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
import Timetable from "./components/Timetable";
import NavigationBar from "./components/NavigationBar";
import Login from "./components/Login";
import Register from "./components/Register";
import axios from 'axios';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_URL;
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <NavigationBar/>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/timetable" element={<Timetable/>}/>
      </Routes>
    </div>
  );
}

export default App;
