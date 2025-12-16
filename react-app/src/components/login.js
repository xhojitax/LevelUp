import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { UserContext } from "../context/userContext";

const Login = ({ setPage }) => {
  const { login } = useContext(UserContext);
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // INTENTO 1: Login con BACKEND (Spring Boot + JWT)
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: emailOrUser,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        console.log("✅ Respuesta del backend:", data);
        console.log("✅ Token recibido:", data.token);
        
        // Guardar token JWT
        localStorage.setItem("token", data.token);

        // Crear objeto de usuario
        const userData = {
          nombre: data.username || emailOrUser,
          email: data.email || `${emailOrUser}@levelup.com`,
          rol: data.rol || "USER",
          token: data.token
        };

        console.log("✅ Guardando usuario:", userData);
        login(userData);
        
        // Verificar que se guardó
        console.log("✅ Token en localStorage:", localStorage.getItem("token"));
        
        setPage("productos");
        setLoading(false);
        return;
      } else {
        console.log("❌ Backend respondió con error:", response.status);
      }

    } catch (backendError) {
      console.log("❌ Backend no disponible:", backendError.message);
    }

    // INTENTO 2: Login con localStorage (FALLBACK) - SIN TOKEN
    console.log("⚠️ Usando fallback sin backend...");
    
    // LOGIN ADMIN LOCAL
    if (emailOrUser.toLowerCase() === "admin" && password === "ADMIN") {
      const admin = { 
        nombre: "Administrador", 
        email: "admin@admin.com", 
        rol: "ADMIN"
        // SIN token - no funcionará para crear productos
      };
      login(admin);
      setPage("productos");
      setLoading(false);
      alert("⚠️ Login local exitoso, pero necesitas el backend corriendo para crear/editar productos");
      return;
    }

    // LOGIN USUARIOS REGISTRADOS EN LOCALSTORAGE
    let usuarios = localStorage.getItem("usuarios");
    usuarios = usuarios ? JSON.parse(usuarios) : {};

    let datosUsuario = null;

    if (emailOrUser.includes('@')) {
      const username = emailOrUser.split('@')[0];
      if (usuarios[username] && usuarios[username].email === emailOrUser) {
        datosUsuario = usuarios[username];
      }
    } else {
      if (usuarios[emailOrUser]) {
        datosUsuario = usuarios[emailOrUser];
      }
    }

    if (datosUsuario && datosUsuario.password === password) {
      const user = {
        nombre: datosUsuario.nombre,
        email: datosUsuario.email,
        rol: datosUsuario.rol || "USER"
        // SIN token
      };

      login(user);
      setPage("productos");
      setLoading(false);
    } else {
      setError("Email/Usuario o contraseña incorrectos");
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Card style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        background: 'rgba(10,14,39,0.9)', 
        border: '2px solid #00ffff',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
      }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: '#00ffff' }}>Iniciar Sesión</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#00ffff' }}>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={emailOrUser}
                onChange={(e) => setEmailOrUser(e.target.value)}
                placeholder="admin"
                required
              />
              <Form.Text style={{ color: '#b8c5d6', fontSize: '0.85rem' }}>
                Usuario: admin / Contraseña: admin123
              </Form.Text>
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

            <Button 
              variant="outline-info" 
              type="submit" 
              className="w-100 mb-3"
              disabled={loading}
              style={{
                background: loading ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
                borderColor: '#00ffff',
                color: '#00ffff'
              }}
            >
              {loading ? 'Iniciando...' : 'Entrar'}
            </Button>
          </Form>

          <div className="text-center">
            <span style={{ color: '#b8c5d6' }}>¿No tienes cuenta? </span>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setPage('registro'); }}
              style={{ color: '#00ffff', textDecoration: 'none' }}
            >
              Regístrate aquí
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;