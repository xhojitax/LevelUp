import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { UserContext } from "../context/userContext";

const Login = ({ setPage }) => {
  const { setUsuario } = useContext(UserContext);
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Usuario ADMIN predefinido
    if (emailOrUser.toLowerCase() === "admin" && password === "ADMIN") {
      const admin = { nombre: "Administrador", email: "admin@admin.com", rol: "ADMIN" };
      setUsuario(admin);
      localStorage.setItem("usuarioLogueado", "true");
      localStorage.setItem("nombreUsuario", admin.nombre);
      localStorage.setItem("rolUsuario", admin.rol);
      setPage("productos");
      return;
    }

    // Usuarios normales guardados en localStorage
    let usuarios = localStorage.getItem("usuarios");
    usuarios = usuarios ? JSON.parse(usuarios) : {};

    let usuarioEncontrado = null;
    let datosUsuario = null;

    if (emailOrUser.includes('@')) {
      // Login por email
      const username = emailOrUser.split('@')[0];
      if (usuarios[username] && usuarios[username].email === emailOrUser) {
        usuarioEncontrado = username;
        datosUsuario = usuarios[username];
      }
    } else {
      // Login por usuario
      if (usuarios[emailOrUser]) {
        usuarioEncontrado = emailOrUser;
        datosUsuario = usuarios[emailOrUser];
      }
    }

    if (datosUsuario && datosUsuario.password === password) {
      const user = { nombre: datosUsuario.nombre, email: datosUsuario.email, rol: datosUsuario.rol || "USER" };
      setUsuario(user);
      localStorage.setItem("usuarioLogueado", "true");
      localStorage.setItem("nombreUsuario", user.nombre);
      localStorage.setItem("rolUsuario", user.rol);
      setPage("productos");
    } else {
      setError("Email/Usuario o contraseña incorrectos");
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Card style={{ maxWidth: '400px', margin: '0 auto', background: 'rgba(10,14,39,0.9)', border: '2px solid #00ffff' }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: '#00ffff' }}>Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#00ffff' }}>Email o Usuario</Form.Label>
              <Form.Control 
                type="text" 
                value={emailOrUser}
                onChange={(e) => setEmailOrUser(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#00ffff' }}>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="outline-info" type="submit" className="w-100 mb-3">Entrar</Button>
          </Form>

          <div className="text-center">
            <span style={{ color: '#b8c5d6' }}>¿No tienes cuenta? </span>
            <a href="/registro" style={{ color: '#00ffff', textDecoration: 'none' }}>Regístrate aquí</a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;