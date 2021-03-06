import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSeedling, faMap } from '@fortawesome/free-solid-svg-icons';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useContext } from 'react';
import UserContext from './userContext';
import '../styles/navbar.module.css';

export default function NavbarMain() {
  const [session, loading] = useSession();
  const { user, setUser } = useContext(UserContext);

  const generateUserDisplay = () => {
    if (user) {
      return (
        <>
          <Navbar.Text>Signed in as: {user.username}</Navbar.Text>
          <Link href="/logout" passHref>
            <Nav.Link>Logout</Nav.Link>
          </Link>
        </>
      );
    }
    return (
      <>
        <Link href="/login" passHref>
          <Nav.Link>Login</Nav.Link>
        </Link>
        <Link href="/signup" passHref>
          <Nav.Link>Sign Up</Nav.Link>
        </Link>
      </>
    );
  };

  return (
    <div id="navbar-style">
      <Navbar expand="lg" collapseOnSelect>
        <Link href="/" passHref>
          <Navbar.Brand>
            <img
              src="/logoOne.png"
              width="200"
              className="d-inline-block align-top"
              alt="..."
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/explore" passHref>
              <Nav.Link>
                <FontAwesomeIcon icon={faMap} /> Explore
              </Nav.Link>
            </Link>
            <Link href="/id" passHref>
              <Nav.Link>
                <FontAwesomeIcon icon={faCamera} /> Id
              </Nav.Link>
            </Link>
            <Link href="/sightings" passHref>
              <Nav.Link>
                <FontAwesomeIcon icon={faSeedling} /> Sightings
              </Nav.Link>
            </Link>
          </Nav>
          {session ? (
            <Nav>
              <Nav.Item className="p-2">
                Signed in as: {session.user.email}
              </Nav.Item>
              <Nav.Item>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="m-1"
                  onClick={signOut}
                >
                  Signout
                </Button>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav>
              <Nav.Item>
                <Button
                  variant="outline-primary"
                  className="m-1"
                  onClick={signIn}
                >
                  Login/Signup
                </Button>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
