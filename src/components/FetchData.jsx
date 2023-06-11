import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isLoggedIn, loadLists } from "../redux/crudSlice";

export default function FetchData() {
  const dispatch = useDispatch();

  const currentUserUid = auth?.currentUser?.uid;
  console.log("currentUserUid", currentUserUid);

  const getData = async () => {
    // Create a reference to the "jobList" collection in the Firestore database
    const dbCollection = collection(db, "jobList");

    // Create a request to retrieve documents from the "jobList" collection
    // that have a field called "userID" equal to the current user's ID
    const req = query(dbCollection, where("userID", "==", currentUserUid));

    try {
     
      const querySnapshot = await getDocs(req);
      // Filter the documents based on the userID property matching the current logged-in user's UID
      const filteredData = querySnapshot.docs
        .filter((doc) => doc.data().userID === currentUserUid) // Filter out documents where the userID property matches the current user's UID
        .map((doc) => ({
          ...doc.data(), // Extract the data from the document
          id: doc.id, // Include the document ID as a new property called "id"
        }));

      console.log(`%c yourText`, "color: hotpink");
      console.log("filteredData", filteredData);
     

      dispatch(loadLists(filteredData));
 
      //dispatch(isLoggedIn(true));
    } catch (error) {
      console.log(`%c error`, "color: red");
      console.log(error);
    }

    //return data;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <h3 style={{ textAlign: "center" }}>{`${
      auth?.currentUser?.email ? "Hi " + auth?.currentUser?.email : ""
    }`}</h3>
  );
}
