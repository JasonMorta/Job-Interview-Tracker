import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import "./styles/CrudModal.css";
import {
  initialState,
  inputComponyName,
  inputLink,
  inputRole,
  inputContactName,
  inputContactEmail,
  inputContactPhone,
  inputApplyDate,
  inputResponse,
  inputInterviewStage,
  inputInterviewTimeDate,
  inputOffer,
  inputFollowUpDate,
  addNew,
  update,
  loadLists,
  openModal,
} from "../redux/crudSlice";
import edit from "./images/edit_property.svg";

export default function CrudModal(props) {

  //const checkCapture = useSelector((state) => state.crud.captureInput)

  const dispatch = useDispatch(); //the action that will happen
  const responseArr = useSelector((state) => state.crud.initialList[0].response);//get the response array for the dropdown list
  const responseSelected = useSelector((state) => state.crud.captureInput.response); //get the response selected value from the captured list

  const stageArr = useSelector((state) => state.crud.initialList[0].response);
  const stageSelected = useSelector((state) => state.crud.captureInput.interviewStage);

  useEffect(() => {
    dispatch(loadLists())
  }, [])

  
  // Check if the modal is for adding or updating
  let check = props.addOrUpdate.crud === "edit"


  const [show, setShow] = useState(false);

  //close modal
  const handleClose = (e) => {
    //only update the state if the user clicked on the update or add button
   if (e?.target?.innerText === 'Add') {
      dispatch(addNew())
    } else if (e?.target?.innerText === 'Update')  {
      dispatch(update(props.addOrUpdate.i))
    }
    setShow(false)
  };

  //Show modal
  const handleShow = (e) => {

    setShow(true)  

    if (e === "Add") {
      dispatch(openModal(e))
        console.log('adding: ')
    } else {
      dispatch(openModal(props.addOrUpdate.i))
        console.log('updating: ')
    }
  };

  return (
    <>
      {props.addOrUpdate.crud === "edit" ? <></>:
      <Button variant="dark" className="add-btn" onClick={()=> handleShow("Add")}>
        Add
      </Button>}

      <img className="edit_icon" src={edit} alt="edit icon" onClick={() => handleShow("Edit")} />

      <Modal show={show} onHide={(e) => handleClose(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Track new Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={ check ? props.addOrUpdate.value.company: ""}
                onInput={(e) => dispatch(inputComponyName(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link to Job / Advert</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? props.addOrUpdate.value.link: ""}
                onInput={(e) => dispatch(inputLink(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? props.addOrUpdate.value.role: ""}
                onInput={(e) => dispatch(inputRole(e.target.value))}
              />
            </Form.Group>

            <Accordion defaultActiveKey="" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Contact</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={check ? props.addOrUpdate.value.contact.name: ""}
                      onInput={(e) =>
                        dispatch(inputContactName(e.target.value))
                      }
                    />
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={check ? props.addOrUpdate.value.contact.email: ""}
                      onInput={(e) =>
                        dispatch(inputContactEmail(e.target.value))
                      }
                    />
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={check ? props.addOrUpdate.value.contact.phone: ""}
                      onInput={(e) =>
                        dispatch(inputContactPhone(e.target.value))
                      }
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Form.Group className="mb-3">
              <Form.Label>Application Date</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? props.addOrUpdate.value.applyDate: ""}
                onInput={(e) => dispatch(inputApplyDate(e.target.value))}
              />
            </Form.Group>

            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="success"
              >
                {responseSelected ? responseSelected : "Response"}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                {responseArr?.map((item, j) => (
                  <Dropdown.Item
                    key={j}
                    onClick={(e) => dispatch(inputResponse(e.target.innerText))}
                  >
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <br />
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="success"
              >
                {stageSelected ? stageSelected : "Interview Stage"}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                {stageArr?.map((item, j) => (
                  <Dropdown.Item
                    key={j}
                    onClick={(e) =>
                      dispatch(inputInterviewStage([e.target.innerText]))
                    }
                  >
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Interview Time-Date & Interviewer Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? props.addOrUpdate.value.interviewTimeDate: ""}
                onInput={(e) =>
                  dispatch(inputInterviewTimeDate(e.target.value))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Offer</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? props.addOrUpdate.value.offer: ""}
                onInput={(e) => dispatch(inputOffer(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Follow Up Date</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? props.addOrUpdate.value.followUpDate: ""}
                onInput={(e) => dispatch(inputFollowUpDate(e.target.value))}
              />
            </Form.Group>

            {/* Form end */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => handleClose(e)}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleClose(e)}>
            {props.addOrUpdate === "Add" ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
