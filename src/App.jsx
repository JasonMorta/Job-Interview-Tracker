
import './App.css';
import TableLayout from './components/TableLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
function App() {

  //reads a variable from a reducer, reducer reads initial state values
  const  stateValues  = useSelector((state) => state.crud);

  return (
    <div className="App">
      <h1>{stateValues.heading}</h1>
      <TableLayout />
    </div>
  );
}

export default App;
