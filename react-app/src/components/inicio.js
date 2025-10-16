import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Inicio = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <Container>
          <h1 className="display-4">Bienvenido a LevelUp</h1>
          <p className="lead">Los mejores productos de gaming y tecnología</p>
          <Button variant="light" size="lg" href="/productos">Ver Productos</Button>
        </Container>
      </div>

      {/* Featured Products */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/300" />
              <Card.Body>
                <Card.Title>Producto Destacado 1</Card.Title>
                <Card.Text>Lo mejor en tecnología gaming</Card.Text>
                <Button variant="primary">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/300" />
              <Card.Body>
                <Card.Title>Producto Destacado 2</Card.Title>
                <Card.Text>Equipamiento profesional</Card.Text>
                <Button variant="primary">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/300" />
              <Card.Body>
                <Card.Title>Producto Destacado 3</Card.Title>
                <Card.Text>Accesorios premium</Card.Text>
                <Button variant="primary">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Inicio;