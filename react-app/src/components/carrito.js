import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const Carrito = () => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Carrito de Compras</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Producto ejemplo</td>
            <td>1</td>
            <td>$19.990</td>
            <td>$19.990</td>
            <td>
              <Button variant="danger" size="sm">Eliminar</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="text-end">
        <h4>Total: $19.990</h4>
        <Button variant="success" size="lg">Proceder al Pago</Button>
      </div>
    </Container>
  );
};

export default Carrito;