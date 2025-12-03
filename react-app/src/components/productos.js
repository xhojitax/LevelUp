import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { CarritoContext } from "../context/carritoContext";
import { UserContext } from "../context/userContext";

const Productos = () => {
  const { usuario } = useContext(UserContext); // ⚠ Detectar rol
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  // Estado de productos
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Teclado Mecánico Gaming', imagen: '/images/teclado.jpg', precio: 79990, descripcion: 'Switches mecánicos de alta precisión', categoria: 'periferico' },
    { id: 2, nombre: 'Audífonos Gamer con Micrófono', imagen: '/images/audifonos-con-microfono-gamer.jpg', precio: 45990, descripcion: 'Audio premium para tu experiencia gaming', categoria: 'periferico' },
    { id: 3, nombre: 'Mouse Gaming RGB', imagen: '/images/raton.png', precio: 29990, descripcion: 'Sensor óptico de alta precisión', categoria: 'periferico' },
    { id: 4, nombre: 'Monitor Gamer 27"', imagen: '/images/monitor gamer 27.jpg', precio: 299990, descripcion: '144Hz, 1ms, Full HD', categoria: 'periferico' },
    { id: 5, nombre: 'Silla Ergonómica Gaming', imagen: '/images/silla ergonomica.jpg', precio: 189990, descripcion: 'Comodidad durante largas sesiones', categoria: 'accesorio' },
    { id: 6, nombre: 'Mousepad XL', imagen: '/images/mousepad.jpg', precio: 15990, descripcion: 'Superficie de tela premium', categoria: 'accesorio' },
    { id: 7, nombre: 'Cámara Web HD', imagen: '/images/camara.png', precio: 45990, descripcion: '1080p, 60fps', categoria: 'accesorio' },
    { id: 8, nombre: 'Soporte para Monitor', imagen: '/images/soporte-monitor.jpg', precio: 35990, descripcion: 'Ajustable en altura', categoria: 'accesorio' },
    { id: 9, nombre: 'God of War', imagen: '/images/godofwar.jpg', precio: 59990, descripcion: 'Edición estándar PS5', categoria: 'videojuego' },
    { id: 10, nombre: 'Juego Aventura', imagen: '/images/juego aventura.jpg', precio: 49990, descripcion: 'Aventura épica', categoria: 'videojuego' },
    { id: 11, nombre: 'Juego Deporte', imagen: '/images/juego deporte.jpg', precio: 54990, descripcion: 'Simulación deportiva', categoria: 'videojuego' },
    { id: 12, nombre: 'Juego Primera Persona', imagen: '/images/juego primera persona.jpg', precio: 59990, descripcion: 'Acción FPS', categoria: 'videojuego' }
  ]);

  // Modal para agregar o editar
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

  const guardarProducto = () => {
    if (modoEdicion) {
      setProductos(productos.map(p => p.id === productoModal.id ? productoModal : p));
    } else {
      setProductos([...productos, { ...productoModal, id: Date.now() }]);
    }
    setMostrarModal(false);
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const productosFiltrados =
    categoriaActiva === 'todos'
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4">Catálogo de Productos</h2>

      {/* Botón Agregar solo ADMIN */}
      {usuario?.rol === "ADMIN" && (
        <Button variant="success" className="mb-3" onClick={() => abrirModal()}>
          Agregar Producto
        </Button>
      )}

      {/* Filtros */}
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
                ? 'Periférico'
                : cat === 'accesorio'
                ? 'Accesorios'
                : 'Videojuegos'}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Grid productos */}
      <Row>
        {productosFiltrados.map((producto) => (
          <Col md={4} key={producto.id} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={producto.imagen}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text className="fw-bold" style={{ color: '#00ffff', fontSize: '1.3rem' }}>
                  ${producto.precio.toLocaleString('es-CL')}
                </Card.Text>

                {usuario?.rol === "ADMIN" ? (
                  <>
                    <Button variant="warning" size="sm" onClick={() => abrirModal(producto)}>Editar</Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => eliminarProducto(producto.id)}>Eliminar</Button>
                  </>
                ) : (
                  <Button variant="primary" className="mt-auto w-100" onClick={() => {
                    agregarAlCarrito({
                      ...producto,
                      cantidad: 1,
                      total: producto.precio
                    });
                  }}>
                    Agregar al Carrito
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Agregar / Editar */}
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
                  onChange={e => setProductoModal({...productoModal, nombre: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={productoModal.precio}
                  onChange={e => setProductoModal({...productoModal, precio: Number(e.target.value)})}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  value={productoModal.descripcion}
                  onChange={e => setProductoModal({...productoModal, descripcion: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={productoModal.categoria}
                  onChange={e => setProductoModal({...productoModal, categoria: e.target.value})}
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