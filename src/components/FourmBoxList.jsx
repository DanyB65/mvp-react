import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const FourmBoxList = ({ setFourmBoxClicked, address, setFourmData, setFourmBoxListClicked, ticketName, date, issue, id,location,setTicketInfo }) => {
  const [putName, setPutName] = useState(ticketName);
  const [putDate, setPutDate] = useState(date);
  const [putIssue, setPutIssue] = useState(issue);
  const [putAddress, setPutAddress] = useState(location.address)
  const [putRequest,setPutRequest] = useState([])

  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleGoBack = () => {
    setFourmBoxClicked(false);
    setFourmBoxListClicked(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = {
      name: putName,
      date: putDate,
      issue: putIssue,
      address: putAddress
    }
  
    fetch(`http://localhost:3001/ticketInfo/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(() => {
      setPutRequest(formData);
      setIsSubmitting(true);
  
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    })
    .catch(error => console.log(error));
  };
  
const handleDelete=()=>{
    fetch(`http://localhost:3001/ticketInfo/${id}`,{
      method: 'Delete'
    }).then(()=>{fetch("http://localhost:3001/ticketInfo")
    .then((response) => response.json())
    .then((data) => setTicketInfo(data))})
}
  const handleEdit = () => {
    setDisabled(!disabled);
  };

  return (
    <Form onSubmit={handleSubmit} style={{paddingBottom:'50px'}} >
      <Row className="mb-3">
        <Form.Group as={Col} controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="Name"
            placeholder="Enter Name"
            value={putName}
            onChange={(event) => setPutName(event.target.value)}
            disabled={disabled}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            
            onChange={(event) => setPutDate(event.target.value)}
            value={putDate}
            disabled={disabled}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="Issue">
        <Form.Label>Issue</Form.Label>
        <Form.Control
          onChange={(event) => setPutIssue(event.target.value)}
          value={putIssue}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control
        onChange={(event) => setPutAddress(event.target.value)}
          value={putAddress}
          disabled={disabled}
        />
      </Form.Group>

      <Button variant="primary" size="md" type="submit" disabled={isSubmitting}
      onClick={handleSubmit}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
      <Button variant="warning" onClick={handleEdit}>
        Edit
      </Button>{' '}
      <Button variant="danger" onClick={handleDelete}>Delete</Button>{' '}
      <Button variant="secondary" size="md" type="button" onClick={handleGoBack}>
        Go back
      </Button>
    </Form>
  );
};

export default FourmBoxList;

  