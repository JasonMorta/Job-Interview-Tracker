import React, { useState } from "react";
import "./styles/TableLayout.css";
import { useSelector, useDispatch } from "react-redux";
import CrudModal from "./CrudModal";
import ListGroup from "react-bootstrap/ListGroup";
import del from "./images/delete_document.svg";
import edit from "./images/edit_property.svg";
import Toast from "react-bootstrap/Toast";
import ok from "./images/ok_1.svg";
import {
  deleteCard,
  showModal,
  editExisting,
  getIndex,
  getCardID,
} from "../redux/crudSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

export default function TableLayout() {
  const stateValues = useSelector((state) => state.crud);
  console.log("stateValues", stateValues.list);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  //const showModalBool = useSelector((state) => state.crud.showModal);

  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State variable to store the selected array item index

  async function getList(id) {
    console.log("id", id);
    try {
      const card = doc(db, "jobList", id);

      await deleteDoc(card);
      console.log("card deleted");
    } catch (error) {
      console.log(error);
      console.log("card NOT deleted");
    }
  }

  return (
    <>
      <section className="table_container">
        {stateValues.list?.map((item, index) => (
          <ListGroup key={index}>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <CrudModal
                  addOrUpdate={{ crud: "edit", value: item, i: index }}
                />
                <Toast
                  bg={"danger"}
                  onClose={() => setShow(false)}
                  show={show && selectedItemIndex === index} // Show the toast only for the selected array item
                  //delay={3000}
                  //autohide
                >
                  <Toast.Header>
                    <strong className="me-auto">Confirm Deleting Card</strong>
                    <img
                      src={ok}
                      className="rounded me-2 confirm-delete"
                      alt="confirm delete icon"
                      onClick={() => {
                        //dispatch(deleteCard([index, item.id]));
                        setShow(false);
                        getList(item.id);
                        dispatch(deleteCard());
                      }}
                    />
                  </Toast.Header>
                  <Toast.Body>
                    <b>WARNING!</b> This action cannot be undone.
                  </Toast.Body>
                </Toast>

                <img
                  className="edit_icon"
                  src={edit}
                  alt="edit icon"
                  onClick={(e) => {
                    //handleShow("Edit")
                    dispatch(showModal([true, "edit", index]));
                    dispatch(getIndex(index));
                    dispatch(editExisting());
                    dispatch(getCardID(item.id));
                    //fill the form with the selected item values
                    //set the input values to the selected item values
                  }}
                />

                <img
                  className="delete-doc"
                  src={del}
                  alt="delete doc"
                  onClick={() => {
                    setSelectedItemIndex(index); // Set the selected array item index
                    setShow(true); // Show the toast
                  }}
                />
                <p className="fw-bold">Interview Card {index}</p>
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Company name</div>
                {item.company}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ maxWidth: "300px", lineBreak: "anywhere" }}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Link</div>
                <p className="job-link">
                  <a href={`${item.link}`} target="_blank" rel="noreferrer">
                    {item.link}
                  </a>
                </p>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Role</div>
                {item.role}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold ">Contact</div>
                <div className="contactList">
                  <p>{`Name: ${item.contact.name}`}</p>
                  <p>{`Email: ${item.contact.email}`}</p>
                  <p>{`Phone: ${item.contact.phone}`}</p>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Apply date</div>
                {item.applyDate}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Response</div>
                {item.response}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Interview stage</div>
                {item.interviewStage}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Interview Time/Date</div>
                {item.interviewTimeDate}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Offer</div>
                {item.offer}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Followup date</div>
                {item.followUpDate}
              </div>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </section>
    </>
  );
}
