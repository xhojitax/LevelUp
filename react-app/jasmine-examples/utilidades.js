// Funciones utilitarias del proyecto LevelUp

// Validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validar contraseña (mínimo 6 caracteres)
function validarPassword(password) {
  return password !== null && password !== undefined && password.length >= 6;
}

// Calcular total del carrito
function calcularTotal(productos) {
  return productos.reduce((total, prod) => total + prod.precio * prod.cantidad, 0);
}

// Aplicar descuento
function aplicarDescuento(total, porcentaje) {
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error('Porcentaje inválido');
  }
  return total - (total * porcentaje / 100);
}

// Formatear precio chileno
function formatearPrecio(precio) {
  return '$' + precio.toLocaleString('es-CL');
}

// Filtrar productos por categoría
function filtrarPorCategoria(productos, categoria) {
  if (categoria === 'todos') return productos;
  return productos.filter(p => p.categoria === categoria);
}