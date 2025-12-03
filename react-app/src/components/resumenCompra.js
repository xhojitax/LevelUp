import React, { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { CarritoContext } from "../context/carritoContext";
import { UserContext } from "../context/userContext";

const ResumenCompra = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const { usuario } = useContext(UserContext);

  const total = carrito.reduce(
    (sum, p) => sum + (p.total || p.precio * p.cantidad),
    0
  );

  const confirmarCompra = () => {
    vaciarCarrito();
    alert("✅ Pago realizado con éxito");
  };

  return (
    <Container className="mt-5">
      <h2>Resumen de Compra</h2>

      {/* Datos del usuario */}
      <h4 className="mt-4">Datos del Usuario</h4>
      {usuario ? (
        <>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
        </>
      ) : (
        <p className="text-danger">No hay usuario iniciado.</p>
      )}

      {/* Productos */}
      <h4 className="mt-4">Productos</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>${(item.total || item.precio * item.cantidad).toLocaleString("es-CL")}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="text-end">Total: ${total.toLocaleString("es-CL")}</h3>

      <Button variant="primary" size="lg" onClick={confirmarCompra}>
        Confirmar Pago
      </Button>
    </Container>
  );
};

export default ResumenCompra;