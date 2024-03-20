import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link, Navigate } from "react-router-dom";
import ajax from "../Services/fetchService";
import Card from "react-bootstrap/Card";
import { Button,Badge,Row,Col } from "react-bootstrap";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    ajax("/api/assignments", "GET", jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, [jwt]);

  function createAssignment() {
    ajax("/api/assignments", "POST", jwt).then((assignment) => {
      window.location.href = `/assignments/${assignment.id}`;
    });
  }

  return (
    <div style={{ margin: "2em" }}>
      <Row>
        <Col>
        <div 
        className="d-flex justify-content-end"
        style={{cursor:"pointer"}}
        onClick={() => {
          setJwt(null);
          window.location.href ="/login";
        }}>

          Logout
        </div>
        </Col>
      </Row>
      <div className="mb-5">
        <Button size="lg" onClick={() => createAssignment()}>
          {" "}
          Submit New Assignment
        </Button>
      </div>
      {assignments ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit,18rem)" }}
        >
          {assignments.map((assignment) => (
            <Card key={assignment.id} style={{ width: "18rem" }}>
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Assignment #{assignment.id}</Card.Title>
                <div className="d-flex align-items-start">
                <Badge pill bg="info" style={{ fontSize: "0.8em",flexGrow:"0",flexShrink:"3"}}>
            {assignment.status}
          </Badge>
                </div>
              
                <Card.Subtitle className="mb-2 text-muted">

                </Card.Subtitle>
                <Card.Text style={{ marginTop: "1em" }}>
                  <p>
                    <b>Github URL:</b> {assignment.githubUrl} 
                  </p>
                  <p>
                    <b>Branch: </b> {assignment.branch}
                  </p>
                </Card.Text>

               

                <Button
                
                  onClick={() => {
                    window.location.href = `/assignments/${assignment.id}`;
                  }}
                >
                  Edit
                </Button>
            
             

               
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
      ;
    </div>
  );
};

export default Dashboard;
