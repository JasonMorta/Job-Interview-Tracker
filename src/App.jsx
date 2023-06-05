
import './App.css';
import TableLayout from './components/TableLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import CrudModal from './components/CrudModal';
import { Button } from 'react-bootstrap';
import { showModal, addNew } from "./redux/crudSlice";


function App() {

  //reads a variable from a reducer, reducer reads initial state values
  const  stateValues  = useSelector((state) => state.crud);

  const dispatch = useDispatch(); //the action that will happen


    //Show modal
    const handleShow = (e) => {
      //console.log('e', true)
     dispatch(showModal([true, "adding"]))
     //dispatch(addNew("adding"))
      // setShow(true)  
  
      // if (e === "Add") {
      //   dispatch(openModal(e))
      //     console.log('adding: ')
      // } else {
      //   dispatch(openModal(props.addOrUpdate.i))
      //     console.log('updating: ')
      // }
    };

  return (
    <>
      <div className="App">
        <h1>{stateValues.heading}</h1>
        <TableLayout />
        <CrudModal />
      
      </div>
        <Button variant="dark" className="add-btn" onClick={()=> handleShow()}>
        Add
      </Button>
    </>
  );
}

export default App;
