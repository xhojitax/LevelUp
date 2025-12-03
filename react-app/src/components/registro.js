import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegistro = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!nombre || !apellido || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un email válido");
      return;
    }

    const usuario = email.split('@')[0];

    let usuarios = localStorage.getItem("usuarios");
    usuarios = usuarios ? JSON.parse(usuarios) : {};

    const emailExiste = Object.values(usuarios).some(u => u.email === email);
    if (emailExiste) {
      setError("Este email ya está registrado. Por favor, inicia sesión.");
      return;
    }

    if (usuarios[usuario]) {
      setError("Ya existe una cuenta con este email. Por favor, inicia sesión.");
      return;
    }

    usuarios[usuario] = {
      nombre: nombre + " " + apellido,
      email: email,
      password: password,
      rol: "USER"
    };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setSuccess(true);
    setNombre("");
    setApellido("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      window.location.href = "/login"; // Usar href en lugar de navigate
    }, 2000);
  };

  return (
    <Container className="mt-5 mb-5">
      <Card style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        background: 'rgba(10, 14, 39, 0.9)',
        border: '2px solid #00ffff',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
      }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: '#00ffff' }}>
            Crear Cuenta
          </h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">
              ¡Registro exitoso! Redirigiendo al login...
            </Alert>
          )}

          <Form onSubmit={handleRegistro}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Nombre</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      border: '1px solid #00ffff'
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Apellido</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Tu apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      border: '1px solid #00ffff'
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#00ffff' }}>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  border: '1px solid #00ffff'
                }}
              />
              <Form.Text style={{ color: '#b8c5d6' }}>
                Usarás tu email para iniciar sesión
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#00ffff' }}>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  border: '1px solid #00ffff'
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#00ffff' }}>Confirmar Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  border: '1px solid #00ffff'
                }}
              />
            </Form.Group>

            <Button 
              variant="outline-info" 
              type="submit" 
              className="w-100 mb-3"
              style={{
                borderColor: '#00ffff',
                color: '#00ffff'
              }}
            >
              Registrarse
            </Button>
          </Form>

          <div className="text-center">
            <span style={{ color: '#b8c5d6' }}>¿Ya tienes cuenta? </span>
            <a href="/login" style={{ color: '#00ffff', textDecoration: 'none' }}>
              Inicia sesión aquí
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Registro;