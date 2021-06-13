import { Navbar, Nav } from "react-bootstrap";
import Link from 'next/link';

export default function NavbarMain () {
  return (
    <Navbar bg="light" expand="lg">
      <Link href="/" passHref><Navbar.Brand href="#home">Plants Around</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Challenge</Nav.Link>
          <Link href="/explore" passHref><Nav.Link>Explore</Nav.Link></Link>
          <Nav.Link href="#link">Id</Nav.Link>
          <Nav.Link href="#link">Login/Signup</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};