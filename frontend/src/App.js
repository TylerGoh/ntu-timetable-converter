import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom'
import Timetable from "./components/Timetable";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Routes>
        <Route path="/timetable" element={<Timetable/>}/>
      </Routes>
    </div>
  );
}

export default App;
