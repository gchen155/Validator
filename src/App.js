import React from 'react';
import './App.css';
//import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';

import {LinkContainer} from "react-router-bootstrap";
import {Navbar, Nav} from "react-bootstrap";
import Routes from "./Routes";

function App() {
  return (
    <div className="component-container">
      <Navbar collpaseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand href="/" className="font-weight-bold text-muted">
          Validator App
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/upload">
              <Nav.Link>Upload</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
      {/* <AmplifySignOut /> */}
    </div>
  );
}

export default App;