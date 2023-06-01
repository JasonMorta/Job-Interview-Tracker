import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "./styles/TableLayout.css";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CrudModal from "./CrudModal";
import ListGroup from "react-bootstrap/ListGroup";

export default function TableLayout() {
  const stateValues = useSelector((state) => state.crud);
  console.log('stateValues', stateValues)
  const [responseOptions, setResponseOptions] = useState();

  return (
    <>
      <section className="table_container">
        {stateValues.list?.map((item, index) => (
          <ListGroup>
           <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Card</div>
                {index}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Compony</div>
                {item.company}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Link</div>
                {item.link}
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
                <div className="fw-bold">Contact name</div>
                {item.contact.name}
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
                {item.interviewStage[0]}
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
                {item.offer[0]}
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
      <CrudModal addNew={"Add"} />
    </>
  );
}
