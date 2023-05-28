import React, { useState } from "react";
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
} from "../redux/crudSlice";

export default function CrudModal(props) {
  const dispatch = useDispatch(); //the action that will happen
  const responseArr = useSelector((state) => state.crud.list[0].response);//get the response array for the dropdown list
  const responseSelected = useSelector((state) => state.crud.captureInput.response); //get the response selected value from the captured list

  const stageArr = useSelector((state) => state.crud.list[0].response);
  const stageSelected = useSelector((state) => state.crud.captureInput.interviewStage);


  let inputValue = useSelector((state) => {
    if (props.passData && props.passData.length > 0) {
      const index = props.passData[1];
      return state.crud.list[index];
    }
    return null;
  });
  


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (e) => {
    setShow(true)  
    if (props.addNew) {
        //dispatch(addNew({val:e.target.value, i: props?.passData[1]}))
        console.log('adding: ')
    } 
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.passData ? "Update" : "Add"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={inputValue ? inputValue.company : ""}
                onChange={(e) => dispatch(inputComponyName({val:e.target.value, i: props?.passData[1]}))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link to Job / Advert</Form.Label>
              <Form.Control
                type="text"
                defaultValue={inputValue ? inputValue.link : ""}
                onChange={(e) => dispatch(inputLink({val:e.target.value, i: props?.passData[1]}))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                defaultValue={inputValue ? inputValue.role : ""}
                onChange={(e) => dispatch(inputRole({val:e.target.value, i: props?.passData[1]}))}
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
                      defaultValue={inputValue ? inputValue.contact.name : ""}
                      onChange={(e) =>
                        dispatch(inputContactName({val:e.target.value, i: props?.passData[1]}))
                      }
                    />
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={inputValue ? inputValue.contact.email : ""}
                      onChange={(e) =>
                        dispatch(inputContactEmail({val:e.target.value, i: props?.passData[1]}))
                      }
                    />
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={inputValue ? inputValue.contact.phone : ""}
                      onChange={(e) =>
                        dispatch(inputContactPhone({val:e.target.value, i: props?.passData[1]}))
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
                defaultValue={inputValue ? inputValue.applyDate : ""}
                onChange={(e) => dispatch(inputApplyDate({val:e.target.value, i: props?.passData[1]}))}
              />
            </Form.Group>

            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
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
                variant="secondary"
              >
                {stageSelected ? stageSelected : "Interview Stage"}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                {stageArr?.map((item, j) => (
                  <Dropdown.Item
                    key={j}
                    onClick={(e) =>
                      dispatch(inputInterviewStage(e.target.innerText))
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
                onChange={(e) =>
                  dispatch(inputInterviewTimeDate(e.target.innerText))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Offer</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  dispatch(inputOffer(e.target.innerText))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Follow Up Date</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  dispatch(inputFollowUpDate(e.target.innerText))
                }
              />
            </Form.Group>

            {/* Form end */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
