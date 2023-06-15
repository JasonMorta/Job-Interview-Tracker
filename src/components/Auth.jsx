import React, { useState } from "react";
import noUser from "./images/unknown-user.png";
import { auth, googleProvider } from "../config/firebase";
import CSS from "./Auth.module.css";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { loadLists } from "../redux/crudSlice";
import { useDispatch } from "react-redux";

export default function Auth() {
  const dispatch = useDispatch();
  const user = auth.currentUser;
  console.log("user", user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userImg, setUserImg] = useState("");

  //! Sign in with Email and Password
  const singInWithEmail = async () => {
    console.log(`%c login started`, 'color: #2196f3')
    try {
      await createUserWithEmailAndPassword(auth, email, password); //this method sends the email and password to firebase
      //console.log("logIn user ", auth?.currentUser);
      //setUserImg(auth?.currentUser?.photoURL);
      console.log(`%c login ended`, 'color: #2196f3')
    } catch (error) {
      console.log("error ", error);
    }
  };

  //! Sign in with Google
  const singInWithGoogle = async () => {
    console.log(`%c making login request`, "color: #70e000");

    try {
      await signInWithPopup(auth, googleProvider);
      console.log("sign with google", auth?.currentUser);
     // sessionStorage.setItem("user", JSON.stringify(auth?.currentUser));
      //setUserImg(auth?.currentUser?.photoURL);

      //passUser(auth?.currentUser);
    } catch (error) {
      console.log("error ", error);
    }
  };

  //Sign out of Google
  const singOut = async () => {
    // try {
    //   await signInWithPopup(auth, googleProvider);
    //   setUserImg(noUser);
    //   dispatch(loadLists(undefined));
    //   //passUser(null);
    //   console.log("signed out");
    // } catch (error) {
    //   console.log("error ", error);
    // }
    console.log('singOut')
    await auth.auth().signOut()
    .then((res) => {
      console.log('res', res)
      // Sign-out successful. You can redirect the user or perform other actions here.
    })
    .catch((error) => {
      // An error occurred. Handle the error gracefully.
      console.error('Error signing out:', error);
    });
  };

  return (
    <div className={CSS.sign_in_with_popup}>
      <h1>Sign in with Email and Password</h1>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={singInWithEmail}>Sign Up</button>

      <h4>Sign in with Google</h4>
      <button onClick={singInWithGoogle}>Sign In</button>
      {/* <img src={userImg ? userImg : noUser} alt="user" /> */}
      {/* <button onClick={singOut}>Sign Ou!t</button> */}
    </div>
  );
}
