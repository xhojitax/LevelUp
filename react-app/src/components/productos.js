import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Modal, Form, Alert } from 'react-bootstrap';
import { CarritoContext } from "../context/carritoContext";
import { UserContext } from "../context/userContext";
import * as productoService from '../services/productoService';

const Productos = () => {
  const { usuario } = useContext(UserContext);
  const { agregarAlCarrito } = useContext(CarritoContext);

  // ----------------------------
  // ESTADO
  // ----------------------------
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----------------------------
  // CARGAR PRODUCTOS DESDE BACKEND
  // ----------------------------
  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await productoService.obtenerProductos();
      
      // Imagen por defecto si no existe
      const productosConImagen = data.map(p => ({
        ...p,
        imagen: p.imagen || "https://via.placeholder.com/400x300?text=Sin+Imagen"
      }));
      
      setProductos(productosConImagen);
      setError(null);
    } catch (err) {
      console.error("ERROR cargando productos:", err);
      setError("No se pudieron cargar los productos. Verifica que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
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
  // MODALES
  // ----------------------------
  const [productoModal, setProductoModal] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const abrirModal = (producto = null) => {
    if (producto) {
      setProductoModal(producto);
      setModoEdicion(true);
    } else {
      // ✅ TODOS LOS CAMPOS REQUERIDOS CON VALORES POR DEFECTO
      setProductoModal({ 
        nombre: "", 
        descripcion: "", 
        precio: 0,
        stock: 10,
        imagen: "https://via.placeholder.com/400x300?text=Sin+Imagen",
        categoria: "Juegos",
        plataforma: "PS5",
        clasificacion: "E",
        desarrollador: "",
        publisher: "",
        genero: "Aventura",
        esNuevo: true,
        disponible: true
      });
      setModoEdicion(false);
    }
    setMostrarModal(true);
  };

  // ----------------------------
  // GUARDAR PRODUCTO (BACKEND)
  // ----------------------------
  const guardarProducto = async () => {
    try {
      if (modoEdicion) {
        // ACTUALIZAR en backend
        await productoService.actualizarProducto(productoModal.id, productoModal);
        alert('Producto actualizado correctamente');
      } else {
        // CREAR en backend
        await productoService.crearProducto(productoModal);
        alert('Producto creado correctamente');
      }
      
      // Recargar productos desde el backend
      await cargarProductos();
      setMostrarModal(false);
      
    } catch (err) {
      console.error("Error al guardar producto:", err);
      alert('Error al guardar el producto. Verifica que tengas permisos de ADMIN.');
    }
  };

  // ----------------------------
  // ELIMINAR PRODUCTO (BACKEND)
  // ----------------------------
  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    try {
      await productoService.eliminarProducto(id);
      alert('Producto eliminado correctamente');
      
      // Recargar productos desde el backend
      await cargarProductos();
      
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert('Error al eliminar el producto. Verifica que tengas permisos de ADMIN.');
    }
  };

  // ----------------------------
  // RENDER
  // ----------------------------
  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h3 style={{ color: '#00ffff' }}>Cargando productos...</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4" style={{ color: '#00ffff' }}>
        Catálogo de Productos
      </h2>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {/* Botón Agregar solo ADMIN */}
      {usuario?.rol === "ADMIN" && (
        <Button 
          variant="success" 
          className="mb-3" 
          onClick={() => abrirModal()}
          style={{
            background: 'linear-gradient(135deg, #00ff88 0%, #00ffff 100%)',
            border: 'none'
          }}
        >
          ➕ Agregar Producto
        </Button>
      )}

      {/* FILTROS */}
      <div className="d-flex justify-content-center mb-4">
        <ButtonGroup size="lg">
          {['todos', 'Juegos', 'Periféricos', 'Accesorios', 'Consolas'].map((cat) => (
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
              {cat}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* GRID */}
      <Row>
        {productosFiltrados.length === 0 ? (
          <Col className="text-center">
            <p style={{ color: '#00ffff', fontSize: '1.2rem' }}>
              No hay productos en esta categoría
            </p>
          </Col>
        ) : (
          productosFiltrados.map((producto) => (
            <Col md={4} key={producto.id} className="mb-4">
              <Card className="h-100" style={{
                background: 'rgba(10, 14, 39, 0.8)',
                border: '2px solid #00ffff',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)'
              }}>
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  onError={(e) => { 
                    e.target.src = "https://via.placeholder.com/400x300?text=Sin+Imagen"; 
                  }}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ color: '#00ffff' }}>
                    {producto.nombre}
                  </Card.Title>
                  <Card.Text style={{ color: '#b8c5d6' }}>
                    {producto.descripcion}
                  </Card.Text>
                  <Card.Text 
                    className="fw-bold" 
                    style={{ color: '#00ffff', fontSize: '1.3rem' }}
                  >
                    ${Number(producto.precio).toLocaleString('es-CL')}
                  </Card.Text>

                  {usuario?.rol === "ADMIN" ? (
                    <div className="mt-auto">
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => abrirModal(producto)}
                      >
                        ✏️ Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        🗑️ Eliminar
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="mt-auto w-100"
                      onClick={() =>
                        agregarAlCarrito({
                          ...producto,
                          cantidad: 1,
                          total: producto.precio
                        })
                      }
                      style={{
                        background: 'linear-gradient(135deg, #0066ff 0%, #00ffff 100%)',
                        border: 'none'
                      }}
                    >
                      🛒 Agregar al Carrito
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* MODAL */}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ background: 'rgba(10, 14, 39, 0.9)', borderBottom: '2px solid #00ffff' }}>
          <Modal.Title style={{ color: '#00ffff' }}>
            {modoEdicion ? "✏️ Editar Producto" : "➕ Agregar Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: 'rgba(10, 14, 39, 0.9)' }}>
          {productoModal && (
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Nombre *</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoModal.nombre}
                    onChange={e => setProductoModal({ ...productoModal, nombre: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Precio *</Form.Label>
                  <Form.Control
                    type="number"
                    value={productoModal.precio}
                    onChange={e =>
                      setProductoModal({ ...productoModal, precio: Number(e.target.value) })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Stock *</Form.Label>
                  <Form.Control
                    type="number"
                    value={productoModal.stock || 0}
                    onChange={e =>
                      setProductoModal({ ...productoModal, stock: Number(e.target.value) })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Categoría *</Form.Label>
                  <Form.Select
                    value={productoModal.categoria}
                    onChange={e => setProductoModal({ ...productoModal, categoria: e.target.value })}
                  >
                    <option value="Juegos">Juegos</option>
                    <option value="Consolas">Consolas</option>
                    <option value="Periféricos">Periféricos</option>
                    <option value="Accesorios">Accesorios</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Plataforma *</Form.Label>
                  <Form.Select
                    value={productoModal.plataforma || 'PS5'}
                    onChange={e => setProductoModal({ ...productoModal, plataforma: e.target.value })}
                  >
                    <option value="PS5">PlayStation 5</option>
                    <option value="Xbox">Xbox Series X/S</option>
                    <option value="PC">PC</option>
                    <option value="Nintendo">Nintendo Switch</option>
                    <option value="Multi">Multiplataforma</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Clasificación *</Form.Label>
                  <Form.Select
                    value={productoModal.clasificacion || 'E'}
                    onChange={e => setProductoModal({ ...productoModal, clasificacion: e.target.value })}
                  >
                    <option value="E">E (Everyone)</option>
                    <option value="E10+">E10+ (Everyone 10+)</option>
                    <option value="T">T (Teen)</option>
                    <option value="M">M (Mature)</option>
                    <option value="AO">AO (Adults Only)</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={productoModal.descripcion}
                    onChange={e => setProductoModal({ ...productoModal, descripcion: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Desarrollador</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoModal.desarrollador || ''}
                    onChange={e => setProductoModal({ ...productoModal, desarrollador: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Publisher</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoModal.publisher || ''}
                    onChange={e => setProductoModal({ ...productoModal, publisher: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>Género</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoModal.genero || ''}
                    onChange={e => setProductoModal({ ...productoModal, genero: e.target.value })}
                    placeholder="Ej: Aventura, Acción, RPG"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#00ffff' }}>URL de Imagen</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoModal.imagen}
                    onChange={e => setProductoModal({ ...productoModal, imagen: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </Form.Group>

                <Form.Check 
                  type="checkbox"
                  label="Es Nuevo"
                  checked={productoModal.esNuevo || false}
                  onChange={e => setProductoModal({ ...productoModal, esNuevo: e.target.checked })}
                  style={{ color: '#00ffff' }}
                  className="mb-2"
                />

                <Form.Check 
                  type="checkbox"
                  label="Disponible"
                  checked={productoModal.disponible || false}
                  onChange={e => setProductoModal({ ...productoModal, disponible: e.target.checked })}
                  style={{ color: '#00ffff' }}
                />
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer style={{ background: 'rgba(10, 14, 39, 0.9)', borderTop: '2px solid #00ffff' }}>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={guardarProducto}
            style={{
              background: 'linear-gradient(135deg, #0066ff 0%, #00ffff 100%)',
              border: 'none'
            }}
          >
            {modoEdicion ? "💾 Guardar Cambios" : "➕ Crear Producto"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Productos;