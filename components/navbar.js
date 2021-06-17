import { Navbar, Nav } from "react-bootstrap";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSeedling, faMap } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/client";

export default function NavbarMain () {
  return (
    <Navbar bg="light" expand="lg" collapseOnSelect>
      <Link href="/" passHref><Navbar.Brand><img src='/logoOne.png' width="200" className="d-inline-block align-top"/></Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/explore" passHref><Nav.Link><FontAwesomeIcon icon={faMap} /> Explore</Nav.Link></Link>
          <Link href="/id" passHref><Nav.Link><FontAwesomeIcon icon={faCamera} /> Id</Nav.Link></Link>
          <Link href="/sightings" passHref><Nav.Link><FontAwesomeIcon icon={faSeedling} /> Sightings</Nav.Link></Link>
          <Nav.Link>Login/Signup</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};