import { Navbar, Nav } from "react-bootstrap";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheckSquare, faMap } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/client";

export default function NavbarMain () {
  return (
    <Navbar bg="light" expand="lg" collapseOnSelect>
      <Link href="/" passHref><Navbar.Brand>Plants Around</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Challenge</Nav.Link>
          <Link href="/explore" passHref><Nav.Link><FontAwesomeIcon icon={faMap} /> Verify</Nav.Link></Link>
          <Link href="/id" passHref><Nav.Link><FontAwesomeIcon icon={faCamera} /> Id</Nav.Link></Link>
          <Link href="/verify" passHref><Nav.Link><FontAwesomeIcon icon={faCheckSquare} /> Verify</Nav.Link></Link>
          <Nav.Link onClick={() => signIn()}>Login/Signup</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};