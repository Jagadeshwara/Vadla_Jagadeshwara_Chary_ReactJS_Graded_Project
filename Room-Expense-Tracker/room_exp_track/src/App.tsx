import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type way = {
  path : string
}

function App() {
  const [path, setPath] = useState("home");

  const login = () => {
    const loginForm = document.getElementById('loginForm');

    loginForm?.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username') as HTMLInputElement;
        const userValue = username?.value;
        const password = document.getElementById('password') as HTMLInputElement;
        const passwordValue = password?.value;

        if (username?.value === 'admin@gmail.com' && password?.value === 'password') {
                        
            window.location.href = 'http://localhost:3000/' + path;
        } else {
            alert('Invalid username/password');
        }
    });
}
  return (
    <>
      <div >
        <Form id='loginForm' onSubmit={login} action='/home'>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" id='username'/>
          </Form.Group><br></br>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" id='password' />
          </Form.Group><br></br>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="secondary" type="reset">
            Reset
          </Button>
        </Form>
      </div>
    </>
  );
}

export default App;
