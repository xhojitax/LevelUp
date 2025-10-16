import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Productos = () => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Nuestros Productos</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" />
            <Card.Body>
              <Card.Title>Producto 1</Card.Title>
              <Card.Text>Descripción del producto 1</Card.Text>
              <Card.Text className="fw-bold">$19.990</Card.Text>
              <Button variant="primary">Agregar al Carrito</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" />
            <Card.Body>
              <Card.Title>Producto 2</Card.Title>
              <Card.Text>Descripción del producto 2</Card.Text>
              <Card.Text className="fw-bold">$29.990</Card.Text>
              <Button variant="primary">Agregar al Carrito</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" />
            <Card.Body>
              <Card.Title>Producto 3</Card.Title>
              <Card.Text>Descripción del producto 3</Card.Text>
              <Card.Text className="fw-bold">$39.990</Card.Text>
              <Button variant="primary">Agregar al Carrito</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Productos;