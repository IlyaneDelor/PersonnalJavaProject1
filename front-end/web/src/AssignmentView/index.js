import React, { useEffect } from "react";
import { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";

const AssignmentView = () => {
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignment] = useState({
    githubUrl: "",
    branch: "",
  });

  const [assignmentEnums, setAssignmentEnums] = useState();

  const [jwt, setJwt] = useLocalState("", "jwt");

  function updateAssignment(props, value) {
    const newAssignment = { ...assignment };
    newAssignment[props] = value;
    setAssignment(newAssignment);
  }

  function save() {
    ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }

  useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
        if (assignmentData.branch === null) assignmentData.branch = "";

        setAssignment(assignmentData);
        setAssignmentEnums(assignmentResponse.assignmentEnums);
      }
    );
  }, []);

  useEffect(() => {
    console.log(assignmentEnums);
  }, [assignmentEnums]);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          <h1> Assignment {assignmentId} </h1>
        </Col>
        <Col>
          <Badge pill bg="info" style={{ fontSize: "1em" }}>
            {assignment.status}
          </Badge>
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              Assignment Number :
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                id="assignmentName"
                variant={"info"}
                title="Assignment 1"
              >
                {assignmentEnums &&
                  assignmentEnums.map((assignmentEnum) => (
                    <Dropdown.Item eventKey={assignmentEnum.assignmentNum}>
                      {assignmentEnum.assignmentNum}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              Github URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                id="branch"
                onChange={(e) => updateAssignment("branch", e.target.value)}
                type={assignment.branch}
                placeholder="http://github.com/username/repo-name"
              />
            </Col>
          </Form.Group>

          <Button size="lg" onClick={() => save()}>
            {" "}
            Submit Assignment
          </Button>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default AssignmentView;
