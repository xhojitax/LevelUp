import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { UserContext } from '../context/userContext';

const Navigation = ({ setPage }) => {
  const { usuario, logout } = useContext(UserContext); // ← CAMBIO AQUÍ

  const cerrarSesion = () => {
    // Limpiar localStorage
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("rolUsuario");
    localStorage.removeItem("token");

    // Usar logout del contexto
    logout(); // ← CAMBIO AQUÍ

    // Redirigir al inicio
    setPage('inicio');
  };

  return (
    <Navbar 
      expand="lg"
      style={{ 
        background: 'rgba(10, 14, 39, 0.95)',
        borderBottom: '2px solid #00ffff',
        boxShadow: '0 2px 20px rgba(0, 255, 255, 0.3)'
      }}
    >
      <Container>
        <Navbar.Brand 
          onClick={() => setPage('inicio')} 
          style={{ 
            cursor: 'pointer',
            color: '#00ffff', 
            fontSize: '2rem', 
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
          }}
        >
          LevelUp
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setPage('inicio')} style={{ color: '#00ffff', marginLeft: '20px', cursor: 'pointer' }}>Inicio</Nav.Link>
            <Nav.Link onClick={() => setPage('productos')} style={{ color: '#00ffff', cursor: 'pointer' }}>Productos</Nav.Link>
            <Nav.Link onClick={() => setPage('carrito')} style={{ color: '#00ffff', cursor: 'pointer' }}>Carrito</Nav.Link>
            <Nav.Link onClick={() => setPage('blog')} style={{ color: '#00ffff', cursor: 'pointer' }}>Blog</Nav.Link>
            <Nav.Link onClick={() => setPage('contacto')} style={{ color: '#00ffff', cursor: 'pointer' }}>Contacto</Nav.Link>
          </Nav>

          {/* SECCIÓN DE USUARIO */}
          <Nav className="ms-auto">
            {usuario ? (
              <div className="d-flex align-items-center">
                <span style={{ color: '#00ffff', marginRight: '15px', fontSize: '1rem' }}>
                  👋 <strong>{usuario.nombre}</strong>
                  {usuario.rol && (
                    <Badge 
                      bg={usuario.rol === "ADMIN" ? "danger" : "info"} 
                      className="ms-2"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {usuario.rol}
                    </Badge>
                  )}
                </span>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={cerrarSesion}
                  style={{
                    borderColor: '#ff0055',
                    color: '#ff0055'
                  }}
                >
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link onClick={() => setPage('login')} style={{ color: '#00ffff', cursor: 'pointer' }}>Login</Nav.Link>
                <Nav.Link onClick={() => setPage('registro')} style={{ color: '#00ffff', cursor: 'pointer' }}>Registro</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;