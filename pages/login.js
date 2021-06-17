import { useState } from "react"
import { Button, Form } from "react-bootstrap"

export default function Login () {
  // We maintain state values for our inputs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(event) {
    debugger;
        // During the submit phase, we simply need to access
        // the input values from our component's state
    console.log(username, password)
  }

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" onClick={onSubmit} className="mt-3">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}