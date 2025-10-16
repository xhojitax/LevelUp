import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Blog = () => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Blog LevelUp</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
            <Card.Body>
              <Card.Title>Título del Artículo 1</Card.Title>
              <Card.Text className="text-muted">Publicado el 15 de Octubre, 2025</Card.Text>
              <Card.Text>
                Breve descripción del artículo del blog. Contenido interesante sobre tecnología...
              </Card.Text>
              <Card.Link href="#">Leer más →</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
            <Card.Body>
              <Card.Title>Título del Artículo 2</Card.Title>
              <Card.Text className="text-muted">Publicado el 10 de Octubre, 2025</Card.Text>
              <Card.Text>
                Otro artículo interesante sobre desarrollo web y las últimas tendencias...
              </Card.Text>
              <Card.Link href="#">Leer más →</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
            <Card.Body>
              <Card.Title>Título del Artículo 3</Card.Title>
              <Card.Text className="text-muted">Publicado el 5 de Octubre, 2025</Card.Text>
              <Card.Text>
                Consejos y trucos para mejorar tu experiencia de compra online...
              </Card.Text>
              <Card.Link href="#">Leer más →</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Blog;