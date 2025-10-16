import React from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const Contacto = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Contáctanos</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h4>Información de Contacto</h4>
              <p><strong>Teléfono:</strong> +56 9 1234 5678</p>
              <p><strong>Email:</strong> contacto@levelup.cl</p>
              <p><strong>Dirección:</strong> Santiago, Chile</p>
              <p><strong>Horario:</strong> Lun - Vie: 9:00 - 18:00</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">Envíanos un Mensaje</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Tu nombre" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="tu@email.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje aquí" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Enviar Mensaje
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;