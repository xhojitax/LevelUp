import React, { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { CarritoContext } from "../context/carritoContext";

const Carrito = ({ irPago }) => {
  const { carrito, eliminarDelCarrito, totalCarrito } = useContext(CarritoContext);

  return (
    <Container className="mt-5">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
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
              {carrito.map(p => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.cantidad}</td>
                  <td>${p.precio.toLocaleString("es-CL")}</td>
                  <td>${(p.precio * p.cantidad).toLocaleString("es-CL")}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => eliminarDelCarrito(p.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4>Total a pagar: ${totalCarrito().toLocaleString("es-CL")}</h4>
          <Button variant="success" onClick={irPago}>Proceder al Pago</Button>
        </>
      )}
    </Container>
  );
};

export default Carrito;