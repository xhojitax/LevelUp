import React, { useContext, useState } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { CarritoContext } from "../context/carritoContext";
import { UserContext } from "../context/userContext";

const Pago = () => {
  const { carrito, vaciarCarrito, totalCarrito } = useContext(CarritoContext);
  const { usuario } = useContext(UserContext);
  const [compraRealizada, setCompraRealizada] = useState(false);

  const confirmarCompra = () => {
    vaciarCarrito();
    setCompraRealizada(true);
  };

  if (compraRealizada) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="success">
          <h2>¡Pago realizado con éxito!</h2>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Resumen de Compra</h2>

      <h4>Datos del Usuario</h4>
      {usuario ? (
        <>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
        </>
      ) : (
        <p>No hay usuario iniciado.</p>
      )}

      <h4>Productos Seleccionados</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.cantidad}</td>
              <td>${(p.precio * p.cantidad).toLocaleString('es-CL')}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Total: ${totalCarrito().toLocaleString('es-CL')}</h4>
      <Button variant="success" onClick={confirmarCompra}>Confirmar Pago</Button>
    </Container>
  );
};

export default Pago;