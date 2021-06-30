import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../components/userContext';

export default function SignUp() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  // We maintain state values for our inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(event) {
    const userInfo = { username };
    axios
      .post('/api/signup', userInfo)
      .then((response) => {
        setUser(response.data);
        router.push('/sightings');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h2>Create Your Account:</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={onSubmit} className="mt-3">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
