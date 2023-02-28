import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const NavBar = ({setFourmBoxClicked , setFourmBoxListClicked}) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleSetFourmBoxListClicked=()=>{
    setFourmBoxListClicked(true)
    setFourmBoxClicked(false)
    handleCloseOffcanvas()
  }
  const handleCLick = ()=>{
    setFourmBoxClicked(true)
  }
  const handleHomeBtn = ()=>{
    setFourmBoxClicked(false)
    setFourmBoxListClicked(false)
  }
  return (
    <Navbar bg="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand style={{ color: "white" }}>Fix My City</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-offcanvas" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link style={{ color: "white" }} onClick={handleHomeBtn}>Home</Nav.Link>
            <Nav.Link style={{ color: "white" }} onClick={handleCLick}>Submit Ticket</Nav.Link>
            {/* <Nav.Link style={{ color: "white" }}>Login</Nav.Link> */}
            <Button variant="outline-light" onClick={handleShowOffcanvas}>My Account</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end" aria-labelledby="offcanvas-menu">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvas-menu">My Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {/* <Nav.Link onClick={handleCloseOffcanvas}>Home</Nav.Link> */}
            <Nav.Link onClick={handleSetFourmBoxListClicked} >Submited Tickets</Nav.Link>
            {/* <Nav.Link onClick={handleCloseOffcanvas}>Login</Nav.Link> */}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
};

export default NavBar;
