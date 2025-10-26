import React from 'react';
import { Container, Carousel } from 'react-bootstrap';

const Inicio = () => {
  return (
    <div>
      {/* Carrusel */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/imagen1.jpg"
            alt="Bienvenido a LevelUp"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h1>Bienvenido a LevelUp</h1>
            <p>Los mejores productos de gaming y tecnología</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/imagen2.jpg"
            alt="Segunda imagen"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/imagen3.jpg"
            alt="Tercera imagen"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Sección Inicio y Visión */}
      <Container className="mt-5 mb-5">
        <div style={{
          background: 'rgba(10, 14, 39, 0.8)',
          border: '2px solid #00ffff',
          borderRadius: '10px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
        }}>
          <h2 style={{ color: '#00ffff', textAlign: 'center', marginBottom: '20px' }}>Inicio</h2>
          <p style={{ color: '#b8c5d6', fontSize: '1.1rem', textAlign: 'center' }}>
            Proporcionar productos de alta calidad para gamers en todo Chile.
          </p>
        </div>

        <div style={{
          background: 'rgba(10, 14, 39, 0.8)',
          border: '2px solid #00ffff',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
        }}>
          <h2 style={{ color: '#00ffff', textAlign: 'center', marginBottom: '20px' }}>Visión</h2>
          <p style={{ color: '#b8c5d6', fontSize: '1.1rem', textAlign: 'center' }}>
            Ser la tienda online líder en productos para gamers en Chile.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Inicio;