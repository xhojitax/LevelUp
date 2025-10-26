import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';

const Productos = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  const productos = [
    {
      id: 1,
      nombre: 'Teclado Mecánico Gaming',
      imagen: '/images/teclado.jpg',
      precio: 79990,
      descripcion: 'Switches mecánicos de alta precisión',
      categoria: 'periferico'
    },
    {
      id: 2,
      nombre: 'Audífonos Gamer con Micrófono',
      imagen: '/images/audifonos-con-microfono-gamer.jpg',
      precio: 45990,
      descripcion: 'Audio premium para tu experiencia gaming',
      categoria: 'periferico'
    },
    {
      id: 3,
      nombre: 'Mouse Gaming RGB',
      imagen: '/images/raton.png',
      precio: 29990,
      descripcion: 'Sensor óptico de alta precisión',
      categoria: 'periferico'
    },
    {
      id: 4,
      nombre: 'Monitor Gamer 27"',
      imagen: '/images/monitor gamer 27.jpg',
      precio: 299990,
      descripcion: '144Hz, 1ms, Full HD',
      categoria: 'periferico'
    },
    {
      id: 5,
      nombre: 'Silla Ergonómica Gaming',
      imagen: '/images/silla ergonomica.jpg',
      precio: 189990,
      descripcion: 'Comodidad durante largas sesiones',
      categoria: 'accesorio'
    },
    {
      id: 6,
      nombre: 'Mousepad XL',
      imagen: '/images/mousepad.jpg',
      precio: 15990,
      descripcion: 'Superficie de tela premium',
      categoria: 'accesorio'
    },
    {
      id: 7,
      nombre: 'Cámara Web HD',
      imagen: '/images/camara.png',
      precio: 45990,
      descripcion: '1080p, 60fps',
      categoria: 'accesorio'
    },
    {
      id: 8,
      nombre: 'Soporte para Monitor',
      imagen: '/images/soporte-monitor.jpg',
      precio: 35990,
      descripcion: 'Ajustable en altura',
      categoria: 'accesorio'
    },
    {
      id: 9,
      nombre: 'God of War',
      imagen: '/images/godofwar.jpg',
      precio: 59990,
      descripcion: 'Edición estándar PS5',
      categoria: 'videojuego'
    },
    {
      id: 10,
      nombre: 'Juego Aventura',
      imagen: '/images/juego aventura.jpg',
      precio: 49990,
      descripcion: 'Aventura épica',
      categoria: 'videojuego'
    },
    {
      id: 11,
      nombre: 'Juego Deporte',
      imagen: '/images/juego deporte.jpg',
      precio: 54990,
      descripcion: 'Simulación deportiva',
      categoria: 'videojuego'
    },
    {
      id: 12,
      nombre: 'Juego Primera Persona',
      imagen: '/images/juego primera persona.jpg',
      precio: 59990,
      descripcion: 'Acción FPS',
      categoria: 'videojuego'
    }
  ];

  const productosFiltrados = categoriaActiva === 'todos' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActiva);

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4">Catálogo de Productos</h2>
      
      {/* Botones de filtro */}
      <div className="d-flex justify-content-center mb-4">
        <ButtonGroup size="lg">
          <Button
            variant={categoriaActiva === 'todos' ? 'primary' : 'outline-primary'}
            onClick={() => setCategoriaActiva('todos')}
            style={{
              minWidth: '150px',
              background: categoriaActiva === 'todos' ? 'linear-gradient(135deg, #0066ff 0%, #00ffff 100%)' : 'transparent',
              borderColor: '#00ffff',
              color: categoriaActiva === 'todos' ? '#fff' : '#00ffff'
            }}
          >
            Todos
          </Button>
          <Button
            variant={categoriaActiva === 'periferico' ? 'primary' : 'outline-primary'}
            onClick={() => setCategoriaActiva('periferico')}
            style={{
              minWidth: '150px',
              background: categoriaActiva === 'periferico' ? 'linear-gradient(135deg, #0066ff 0%, #00ffff 100%)' : 'transparent',
              borderColor: '#00ffff',
              color: categoriaActiva === 'periferico' ? '#fff' : '#00ffff'
            }}
          >
            Periférico
          </Button>
          <Button
            variant={categoriaActiva === 'accesorio' ? 'primary' : 'outline-primary'}
            onClick={() => setCategoriaActiva('accesorio')}
            style={{
              minWidth: '150px',
              background: categoriaActiva === 'accesorio' ? 'linear-gradient(135deg, #0066ff 0%, #00ffff 100%)' : 'transparent',
              borderColor: '#00ffff',
              color: categoriaActiva === 'accesorio' ? '#fff' : '#00ffff'
            }}
          >
            Accesorios
          </Button>
          <Button
            variant={categoriaActiva === 'videojuego' ? 'primary' : 'outline-primary'}
            onClick={() => setCategoriaActiva('videojuego')}
            style={{
              minWidth: '150px',
              background: categoriaActiva === 'videojuego' ? 'linear-gradient(135deg, #0066ff 0%, #00ffff 100%)' : 'transparent',
              borderColor: '#00ffff',
              color: categoriaActiva === 'videojuego' ? '#fff' : '#00ffff'
            }}
          >
            Videojuegos
          </Button>
        </ButtonGroup>
      </div>

      {/* Grid de productos */}
      <Row>
        {productosFiltrados.map((producto) => (
          <Col md={4} key={producto.id} className="mb-4">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={producto.imagen} 
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text className="fw-bold" style={{ color: '#00ffff', fontSize: '1.3rem' }}>
                  ${producto.precio.toLocaleString('es-CL')}
                </Card.Text>
                <Button variant="primary" className="mt-auto w-100">
                  Agregar al Carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Productos;