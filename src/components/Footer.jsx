
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ReduxLiteContext } from '../global/ReduxLiteContext';

const NavBar = () => {
  const{test,setTest} = useContext(ReduxLiteContext)
  
  return (
    <Navbar bg="dark" expand="lg" fixed='bottom' style={{ height: '30px' }}>
      <Container>
        <Navbar.Brand style={{ color: "white" }}>Fix My City</Navbar.Brand>
        <Nav className="ml-auto">
          {/* <Nav.Link style={{ color: "white" }}>Home</Nav.Link> */}
          <Nav.Link style={{ color: "white" }}>Dany Briceno</Nav.Link>
          
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;