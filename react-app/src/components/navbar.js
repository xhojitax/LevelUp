import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = ({ setPage }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => setPage('inicio')} style={{ cursor: 'pointer' }}>
          LevelUp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setPage('inicio')}>Inicio</Nav.Link>
            <Nav.Link onClick={() => setPage('productos')}>Productos</Nav.Link>
            <Nav.Link onClick={() => setPage('carrito')}>Carrito</Nav.Link>
            <Nav.Link onClick={() => setPage('blog')}>Blog</Nav.Link>
            <Nav.Link onClick={() => setPage('contacto')}>Contacto</Nav.Link>
            <Nav.Link onClick={() => setPage('login')}>Login</Nav.Link>
            <Nav.Link onClick={() => setPage('registro')}>Registro</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;