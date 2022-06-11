import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export default function Navbary() {

  let user;
  if(sessionStorage.email && sessionStorage.admin ){
    user = sessionStorage;
  }

  return (
    <div className='mb-4'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Aduana Virtual</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {user && user.admin==='true' &&
                <Nav.Link href="/admin">Admin</Nav.Link>
              }
              {!user &&
                <>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
