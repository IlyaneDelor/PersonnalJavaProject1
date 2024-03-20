import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link, Navigate } from "react-router-dom";
import ajax from "../Services/fetchService";
import Card from "react-bootstrap/Card";
import { Button, Badge, Row, Col, Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const CodeReviewerDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    ajax("/api/assignments", "GET", jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, [jwt]);

  function claimAssignment(assignment) {
    const decodedJwt = jwtDecode(jwt);
    const user = {
      //id: null,
      username: decodedJwt.sub,
      authorities: ["ROLE_CODE_REVIEWER"],
    };

    assignment.codeReviewer = user;
    assignment.status = "In Review";
    ajax(`/api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(
      (updatedAssignment) => {
        const assignmentsCopy = [...assignments];
        const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
        assignmentsCopy[i] = updatedAssignment;
        setAssignments(assignmentsCopy);
      }
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setJwt(null);
              window.location.href = "/login";
            }}
          >
            Logout
          </div>
        </Col>
      </Row>
      <div className="assignment-wrapper in-review">
        <div className="h3 px-2  assignment-wrapper-title">In Review</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "In Review")
          .length > 0 ? (
          <div className="row justify-content-center">
            {assignments
              .filter((assignment) => assignment.status === "In Review")
              .map((assignment) => (
                <div key={assignment.id} className="col-4 mb-3">
                  <Card style={{ width: "20rem", height: "25rem" }}>
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title className="text-center">
                        Assignment #{assignment.id}
                      </Card.Title>
                      <div className="d-flex justify-content-center">
                        <Badge
                          pill
                          bg="info"
                          style={{
                            fontSize: "1em",
                          }}
                        >
                          {assignment.status}
                        </Badge>
                      </div>

                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Card.Text
                        className="text-center"
                        style={{ marginTop: "1em" }}
                      >
                        <p>
                          <b>Github URL:</b> {assignment.githubUrl}
                        </p>
                        <p>
                          <b>Branch: </b> {assignment.branch}
                        </p>
                      </Card.Text>

                      <Button
                        onClick={() => {
                          claimAssignment(assignment);
                        }}
                      >
                        Claim
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        ) : (
          <div> No Assignment Found </div>
        )}
      </div>
      <div className="assignment-wrapper submitted">
        <div className="h3 px-2  assignment-wrapper-title">Awaiting Review</div>

        {assignments &&
        assignments.filter((assignment) => assignment.status === "Submitted")
          .length > 0 ? (
          <div className="row justify-content-center">
            {assignments
              .filter((assignment) => assignment.status === "Submitted")
              .map((assignment) => (
                <div key={assignment.id} className="col-4 mb-3">
                  <Card style={{ width: "20rem", height: "25rem" }}>
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title className="text-center">
                        Assignment #{assignment.id}
                      </Card.Title>
                      <div className="d-flex justify-content-center">
                        <Badge
                          pill
                          bg="info"
                          style={{
                            fontSize: "1em",
                          }}
                        >
                          {assignment.status}
                        </Badge>
                      </div>

                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Card.Text
                        className="text-center"
                        style={{ marginTop: "1em" }}
                      >
                        <p>
                          <b>Github URL:</b> {assignment.githubUrl}
                        </p>
                        <p>
                          <b>Branch: </b> {assignment.branch}
                        </p>
                      </Card.Text>

                      <Button
                        onClick={() => {
                          claimAssignment(assignment);
                        }}
                      >
                        Claim
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        ) : (
          <div> No Assignment Found </div>
        )}
      </div>

      <div className="assignment-wrapper needs-update">
        <div className="h3 px-2  assignment-wrapper-title">Needs Update</div>

        {assignments &&
        assignments.filter((assignment) => assignment.status === "Needs Update")
          .length > 0 ? (
          <div className="row justify-content-center">
            {assignments
              .filter((assignment) => assignment.status === "Needs Update")
              .map((assignment) => (
                <div key={assignment.id} className="col-4 mb-3">
                  <Card style={{ width: "20rem", height: "25rem" }}>
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title className="text-center">
                        Assignment #{assignment.id}
                      </Card.Title>
                      <div className="d-flex justify-content-center">
                        <Badge
                          pill
                          bg="info"
                          style={{
                            fontSize: "1em",
                          }}
                        >
                          {assignment.status}
                        </Badge>
                      </div>

                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Card.Text
                        className="text-center"
                        style={{ marginTop: "1em" }}
                      >
                        <p>
                          <b>Github URL:</b> {assignment.githubUrl}
                        </p>
                        <p>
                          <b>Branch: </b> {assignment.branch}
                        </p>
                      </Card.Text>

                      <Button
                        onClick={() => {
                          claimAssignment(assignment);
                        }}
                      >
                        Claim
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        ) : (
          <div> No Assignment Found </div>
        )}
      </div>
    </Container>
  );
};

export default CodeReviewerDashboard;
