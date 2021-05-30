import { Navbar, Nav } from "react-bootstrap";

export default function NavbarMain () {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Plants Around</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Challenge</Nav.Link>
          <Nav.Link href="#link">Search</Nav.Link>
          <Nav.Link href="#link">Id</Nav.Link>
          <Nav.Link href="#link">Login/Signup</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};