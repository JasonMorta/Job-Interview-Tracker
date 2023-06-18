import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import "./styles/CrudModal.css";
import {
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
  inputLocation,
  showModal,
} from "../redux/crudSlice";

export default function CrudModal(props) {
  //const checkCapture = useSelector((state) => state.crud.captureInput)
  const dispatch = useDispatch(); //the action that will happen
  const responseArr = useSelector((state) => state.crud?.initialList[0]?.response);
  //get the response array for the dropdown list?
  //useSelector is a hook that allows you to extract data from the Redux store state, 
  //using a selector function.
  const responseSelected = useSelector((state) => state.crud?.captureInput?.response); //get the response selected value from the captured list?

  const list = useSelector((state) => state.crud?.captureInput);
  const index = useSelector((state) => state.crud?.currentIndex);
  // const list = useSelector((state) => state.crud?.captureInput);



  const stageArr = useSelector((state) => state.crud?.initialList[0]?.response);
  const stageSelected = useSelector((state) => state.crud?.captureInput?.interviewStage);

  useEffect(() => {
    // Load the initial list?
    //dispatch(loadLists())
    
  }, [])

  // Check if the modal is for adding or editing (adding = true, editing = false)
  const crud = useSelector((state) => state.crud?.addOrEdit);

  let check = crud === "adding" ? true : false;

  //const [show, setShow] = useState(false);
  const show = useSelector((state) => state.crud?.showModal);

  //close modal
  const handleClose = (e) => {
    //dispatch(update(false))

    //only add new if the button if the Add button is clicked
   if (check && e?.target?.innerText === "Add") {
      dispatch(addNew())

      //only update if the button if the Update button is clicked
    } else if (check === false && e?.target?.innerText === "Update") {
      console.log('updated')
      dispatch(update())
    }
    console.log(`%c hideModal`, 'color: #90e0ef')
    dispatch(showModal([false]))
  };


  return (
    <>
      <Modal show={show} onHide={(e) => handleClose(e)}>
        <Modal.Header closeButton>
          <Modal.Title>{check ? "Track new Interview" : "Update Interview Status"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={ check ? "": list?.company}
                onInput={(e) => dispatch(inputComponyName(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? "": list?.location}
                onInput={(e) => dispatch(inputLocation(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link to Job / Advert</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? "": list?.link}
                onInput={(e) => dispatch(inputLink(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? "": list?.role}
                onInput={(e) => dispatch(inputRole(e.target.value))}
              />
            </Form.Group>

            <Accordion defaultActiveKey="" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header><b>Contact</b></Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={check ? "": list?.contact.name}
                      onInput={(e) =>
                        dispatch(inputContactName(e.target.value))
                      }
                    />
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={check ? "": list?.contact.email}
                      onInput={(e) =>
                        dispatch(inputContactEmail(e.target.value))
                      }
                    />
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={check ? "": list?.contact.phone}
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
                defaultValue={check ? "": list?.applyDate}
                onInput={(e) => dispatch(inputApplyDate(e.target.value))}
              />
            </Form.Group>

            <Dropdown>
              <div className='modal-response-container' >
                <label >Response</label>
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="success"
                >
                  {responseSelected ? responseSelected : "Response"}
                </Dropdown.Toggle>
              </div>
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
             <div className="modal-stage-container">
             <label >Interview Stage</label>
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="success"
                >
                  {stageSelected ? stageSelected : "Interview Stage"}
                </Dropdown.Toggle>
             </div>
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
                defaultValue={check ? "": list?.interviewTimeDate}
                onInput={(e) =>
                  dispatch(inputInterviewTimeDate(e.target.value))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Offer</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? "": list?.offer}
                onInput={(e) => dispatch(inputOffer(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Follow Up Date</Form.Label>
              <Form.Control
                type="text"
                defaultValue={check ? "": list?.followUpDate}
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
            {check ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
