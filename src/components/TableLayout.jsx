import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "./styles/TableLayout.css";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CrudModal from "./CrudModal";

export default function TableLayout() {
  const stateValues = useSelector((state) => state.crud);
  const [responseOptions, setResponseOptions] = useState();

  return (
    <>
      <section className="table_container">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Link to Job Advert</th>
              <th>Role</th>
              <th>Contact</th>
              <th>Application Date</th>
              <th>Response</th>
              <th>Interview Stage</th>
              <th>Interview Time-Date</th>
              <th>Offer</th>
              <th>Follow Up Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stateValues.list?.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.Company}</td>
                <td>{item.link}</td>
                <td>{item.role}</td>
                <td>{item.contact.name}</td>
                <td>{item.applyDate}</td>
                <td>{item.response}</td>
                <td>{item.interviewStage[0]}</td>
                <td>{item.interviewTimeDate}</td>
                <td>{item.offer[0]}</td>
                <td>{item.followUpDate}</td>
                <td>
                  <span>Delete</span>
                </td>
                <td>
                  <span><CrudModal passData={[item, index]} /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    
      </section>
          <CrudModal addNew={"Add"}   />
    </>
  );
}
