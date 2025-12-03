import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { CarritoContext } from "../context/carritoContext";
import { UserContext } from "../context/userContext";

const Productos = () => {
  const { usuario } = useContext(UserContext);
  const { agregarAlCarrito } = useContext(CarritoContext);

  // ----------------------------
  // ESTADO DE PRODUCTOS (API)
  // ----------------------------
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then(res => res.json())
      .then(data => {
        // Imagen por defecto si no existe
        const productosConImagen = data.map(p => ({
          ...p,
          imagen: p.imagen || "https://via.placeholder.com/400x300?text=Sin+Imagen"
        }));
        setProductos(productosConImagen);
      })
      .catch(err => console.error("ERROR cargando productos:", err));
  }, []);

  // ----------------------------
  // FILTRADO
  // ----------------------------
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  const productosFiltrados =
    categoriaActiva === 'todos'
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  // ----------------------------
  // MODALES (AGREGAR / EDITAR)
  // ----------------------------
  const [productoModal, setProductoModal] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const abrirModal = (producto = null) => {
    if (producto) {
      setProductoModal(producto);
      setModoEdicion(true);
    } else {
      setProductoModal({ nombre: "", precio: 0, descripcion: "", categoria: "" });
      setModoEdicion(false);
    }
    setMostrarModal(true);
  };

  // ----------------------------
  // GUARDAR PRODUCTO (LOCAL SOLO PARA PRESENTACIÓN)
  // ----------------------------
  const guardarProducto = () => {
    if (modoEdicion) {
      setProductos(productos.map(p => p.id === productoModal.id ? productoModal : p));
    } else {
      setProductos([...productos, { ...productoModal, id: Date.now() }]);
    }
    setMostrarModal(false);
  };

  // ----------------------------
  // ELIMINAR PRODUCTO
  // ----------------------------
  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4">Catálogo de Productos</h2>

      {/* Botón Agregar solo ADMIN */}
      {usuario?.rol === "ADMIN" && (
        <Button variant="success" className="mb-3" onClick={() => abrirModal()}>
          Agregar Producto
        </Button>
      )}

      {/* FILTROS */}
      <div className="d-flex justify-content-center mb-4">
        <ButtonGroup size="lg">
          {['todos', 'periferico', 'accesorio', 'videojuego'].map((cat) => (
            <Button
              key={cat}
              variant={categoriaActiva === cat ? 'primary' : 'outline-primary'}
              onClick={() => setCategoriaActiva(cat)}
              style={{
                minWidth: '150px',
                background: categoriaActiva === cat
                  ? 'linear-gradient(135deg, #0066ff 0%, #00ffff 100%)'
                  : 'transparent',
                borderColor: '#00ffff',
                color: categoriaActiva === cat ? '#fff' : '#00ffff'
              }}
            >
              {cat === 'todos'
                ? 'Todos'
                : cat === 'periferico'
                ? 'Periféricos'
                : cat === 'accesorio'
                ? 'Accesorios'
                : 'Videojuegos'}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* GRID */}
      <Row>
        {productosFiltrados.map((producto) => (
          <Col md={4} key={producto.id} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={producto.imagen}
                onError={(e) => { e.target.src = "/images/default.png"; }}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text className="fw-bold" style={{ color: '#00ffff', fontSize: '1.3rem' }}>
                  ${Number(producto.precio).toLocaleString('es-CL')}
                </Card.Text>

                {usuario?.rol === "ADMIN" ? (
                  <>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => abrirModal(producto)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    className="mt-auto w-100"
                    onClick={() =>
                      agregarAlCarrito({
                        ...producto,
                        cantidad: 1,
                        total: producto.precio
                      })
                    }
                  >
                    Agregar al Carrito
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* MODAL */}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoModal && (
            <>
              <Form.Group className="mb-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={productoModal.nombre}
                  onChange={e => setProductoModal({ ...productoModal, nombre: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={productoModal.precio}
                  onChange={e =>
                    setProductoModal({ ...productoModal, precio: Number(e.target.value) })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  value={productoModal.descripcion}
                  onChange={e => setProductoModal({ ...productoModal, descripcion: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={productoModal.categoria}
                  onChange={e => setProductoModal({ ...productoModal, categoria: e.target.value })}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={guardarProducto}>
            {modoEdicion ? "Guardar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Productos;
