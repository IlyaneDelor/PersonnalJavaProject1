import React, { useEffect } from "react";
import { useState,useRef } from "react";
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
    number: null,
    status:null,
  });

  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignmentStatuses,setAssignmentStatuses] = useState([]);
  

  const [jwt, setJwt] = useLocalState("", "jwt");
  const prevAssignmentValue = useRef(assignment);

  async function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;

    await setAssignment(newAssignment);
    

  }

 function save() {

    if(assignment.status === assignmentStatuses[0].status) {
      updateAssignment("status",assignmentStatuses[1].status);

    }else{
      persist();
    }

}

function persist(){
  ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
    (assignmentData) => {
      console.log(assignmentData)
      setAssignment(assignmentData);
      
    }
  );
}


useEffect(() => {
  if(prevAssignmentValue.current.status !== assignment.status){
   persist();
  }

  prevAssignmentValue.current = assignment;
}, [assignment])

  useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
        if (assignmentData.branch === null) assignmentData.branch = "";

        setAssignment(assignmentData);
        setAssignmentEnums(assignmentResponse.assignmentEnums);
        
        
        setAssignmentStatuses(assignmentResponse.statusEnums);
      }
    );
  }, []);



  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number ? (
            <h1>Assignment {assignment.number} </h1>
          ) : (
            <h1>No assignment selected</h1>
          )}
        </Col>
        <Col>
          <Badge pill bg="info" style={{ fontSize: "1em" }}>
            {assignment.status}
          </Badge>
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Assignment Number :
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                variant={"info"}
                title={
                  assignment.number
                    ? `Assignment ${assignment.number}`
                    : "Select an assignment"
                }
                onSelect={(selectedElement) => {
                
                  updateAssignment("number", selectedElement);
                }}
              >
                {assignmentEnums &&
                  assignmentEnums.map((assignmentEnum) => (
                    <Dropdown.Item key= {assignmentEnum.assignmentNum} eventKey={assignmentEnum.assignmentNum}>
                      {assignmentEnum.assignmentNum}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="githubUrl">
            <Form.Label column sm="3" md="2">
              Github URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                value={assignment.githubUrl}
                type="url"
                placeholder="http://github.com/username/repo-name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3" md="2">
              Github URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                onChange={(e) => updateAssignment("branch", e.target.value)}
                value={assignment.branch}
                type="text"
                placeholder="example_branch_name"
              />
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
          <Button size="lg" onClick={() => save()}>
            {" "}
            Submit Assignment
          </Button>
          
          <Button
                  variant="secondary"
                  onClick={() => {
                    window.location.href = `/dashboard`;
                  }}
                >
                  Back
                </Button>
                </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default AssignmentView;
