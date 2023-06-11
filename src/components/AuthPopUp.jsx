import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import hidePass from "./images/hide.png";
import showPass from "./images/show.png";
import CSS from "./Auth.module.css";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../redux/crudSlice";

export default function AuthPopUp() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState("false");
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  //Redux state
  const dispatch = useDispatch();

  //! First login or register with email then close modal synchronously
  const handleClose = (event) => {
    console.log("event", event);
    console.log("newUser", newUser);

    if (event === "hide") { //if the user clicks on the close button don't do anything
      setShow(false);
      return;
    } else if (newUser === "true") {
      console.log("signing up");
      signUpWithEmail();
    } else if (newUser === "false") {
      console.log("signing in");
      singInWithEmail();
    }
    setShow(false);
  };

  //!Show modal and set newUser state
  const handleShow = (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText === "Sign in") {
      setNewUser("false");
      setShow(true);
    } else if (e.target.innerText === "Sign up") {
      setNewUser("true");
      setShow(true);
    } else {
      setShow("invalid");
    }
  };

  //! Sign in with Email and Password
  async function singInWithEmail() {
    try {
      await signInWithEmailAndPassword(auth, email, password); //this method sends the email and password to firebase
      console.log("logIn user ", auth?.currentUser);
      setUserData(auth?.currentUser);
      setLoggedIn(true);
      dispatch(isLoggedIn(true));
    } catch (error) {
      console.log("error ", error);
    }
  }

  async function signUpWithEmail() {
    console.log("sign up with email");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("sign up with email", auth?.currentUser);
      setUserData(auth?.currentUser);
      setLoggedIn(true);
      dispatch(isLoggedIn(true));
    } catch (error) {
      console.log("error ", error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      setUserData(null);
      setLoggedIn(false);
      dispatch(isLoggedIn(false));
      console.log('currentUser: ',auth.currentUser)
    } catch (error) {
      console.log("error ", error);
    }
  }


  // useEffect(() => {
  //   console.log("userData", userData);
  // }, [userData]);

  //password visibility
  function secret(e) {
    if (e.target.src === hidePass) {
      e.target.src = showPass;
      e.target.previousSibling.type = "text";
    } else {
      e.target.src = hidePass;
      e.target.previousSibling.type = "password";
    }
  }

  return (
    <>
      <div className="sing_btn_container">
        {loggedIn ?  
        <Button
            variant="dark"
            className="sign_out"
            onClick={(e) => handleSignOut(e)}
          >Sign out</Button>
          :
           <>
          <Button
            variant="light"
            className="sign_in"
            onClick={(e) => handleShow(e)}
          >
            Sign in
          </Button>
          <Button
            variant="dark"
            className="sign_up"
            onClick={(e) => handleShow(e)}
          >
            Sign up
          </Button>
        </>}
      </div>

      <Modal
        show={show}
        onHide={(e) => {
          setNewUser("invalid");
          handleClose("hide");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{newUser === "true" ? "Sign up" : "Sign in"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <br />
              <div className={CSS.password_vis_container}>
                <Form.Control
                  type="password"
                  placeholder="password"
                  autoFocus
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  className={CSS.password_visibility}
                  src={hidePass}
                  alt="hide password icon"
                  onClick={(e) => secret(e)}
                />
              </div>
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
              }}
            >
              {newUser === "true" ? "Sign up" : "Sign in"}
            </Button>
            <br />
            <br />
            <Button
              variant="secondary"
              onClick={() => {
                //setNewUser(true);
                signUpWithEmail();
                handleClose();
              }}
            >
              Sign in with Google
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

