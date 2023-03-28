import React, { useState,useContext } from "react";
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthData } = useContext(authContext);
  let navigate = useNavigate();

  function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/api/auth/login`, requestOptions)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            setAuthData(user);
            return user;
        });
}

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setShowAlert(false);
    login(username, password).then( user => {
      navigate("/home");
    }).catch((error) => {
        setShowAlert(true);
        setIsLoading(false);
    })
}

  return (
    <Container id="login">
    <form name='login' onSubmit={handleSubmit}>
        <img className="mb-2" src="login-svg.svg" alt="" width="120" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <Alert id="formAlert" show={showAlert} variant="danger">Invalid username or password.</Alert>

        <fieldset disabled={isLoading}>
            <Form.Group controlId="username">
                <Form.Label className="sr-only">Username</Form.Label>
                <Form.Control className="form-control mb-2"
                    placeholder="Username"
                    autoFocus
                    type="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label className="sr-only">Password</Form.Label>
                <Form.Control className="form-control mb-2"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    required
                />
            </Form.Group>

            <button type="submit" className="btn btn-lg btn-primary btn-block" id="loginButton">
            Login {isLoading && <span className="spinner-border spinner-border-sm"
                                        role="status" aria-hidden="true" id="loginSpinner"></span>}
            </button>
        </fieldset>
    </form>
</Container>
  )
}

export default LoginPage