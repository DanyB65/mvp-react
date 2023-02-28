import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton({ isLoading, onClick }) {
  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        onClick();
      });
    }
  }, [isLoading, onClick]);

  return (
    <Button variant="primary" disabled={isLoading} onClick={!isLoading ? onClick : null}>
      {isLoading ? 'Loading…' : 'Submit'}
    </Button>
  );
}

function ForumBox({ setFourmBoxClicked, address, setFourmData, setAddress, setTicketInfo }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [issue, setIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoBack = () => {
    setFourmBoxClicked(false);
  };

  const handleAddress = () => {
    return address.address;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      date: date,
      issue: issue,
      address: handleAddress()
    }
    fetch('http://localhost:3001/ticketInfo',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(()=>{
      fetch("http://localhost:3001/ticketInfo")
      .then((response) => response.json())
      .then((data) => setTicketInfo(data));
    })
    
    

    console.log(formData)

    setIsSubmitting(true);

    setTimeout(() => {
      setFourmData([formData]);
      setIsSubmitting(false);
      setFourmBoxClicked(false);
      setAddress(null)
    }, 2000);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="Name"
            placeholder="Enter Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="Date"
            placeholder="Today's Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="Issue">
        <Form.Label>Issue</Form.Label>
        <Form.Control
          placeholder="Brief description of the problem..."
          value={issue}
          onChange={(event) => setIssue(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control
          placeholder={
            !address
              ? 'Once you click on a location up the Map this will Auto-Fill everything :)'
              : handleAddress()
          }
          disabled
        />
      </Form.Group>

      <LoadingButton  isLoading={isSubmitting} onClick={handleSubmit} />

      <Button variant="secondary" size="md" type="button" onClick={handleGoBack}>
        Go back
      </Button>
    </Form>
  );
}

export default ForumBox;
