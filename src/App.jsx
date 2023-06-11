import "./App.css";
import TableLayout from "./components/TableLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import CrudModal from "./components/CrudModal";
import { Button } from "react-bootstrap";
import { showModal, loggedIn } from "./redux/crudSlice";
import Auth from "./components/Auth";
import AuthPopUp from "./components/AuthPopUp";
import { useState } from "react";
import FetchData from "./components/FetchData";

function App() {
  //reads a variable from a reducer, reducer reads initial state values
  const stateValues = useSelector((state) => state.crud);
  // const [showSignIn, setShowSignIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.crud.isLoggedIn);

  const dispatch = useDispatch(); //the action that will happen

  //Show modal
  const handleShow = (e) => {
    dispatch(showModal([true, "adding"]));
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{stateValues.heading}</h1>
     
      {isLoggedIn && (
        <>
         <FetchData />
          <TableLayout />
          <CrudModal />

          <Button
            variant="dark"
            className="add-btn"
            onClick={() => handleShow()}
          >
            Add
          </Button>
        </>
      )}
      <CrudModal />
      <AuthPopUp />
    </>
  );
}

export default App;
