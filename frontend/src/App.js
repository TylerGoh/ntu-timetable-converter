import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Timetable from "./components/Timetable";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Timetable/>
    </div>
  );
}

export default App;
