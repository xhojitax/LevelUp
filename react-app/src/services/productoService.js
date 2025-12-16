import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productos';

// Obtener el token del localStorage
const getAuthHeader = () => {
  // Intentar obtener el token directamente
  let token = localStorage.getItem('token');
  
  // Si no está, intentar obtenerlo del objeto usuario
  if (!token) {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      token = usuario.token;
    }
  }
  
  console.log('🔑 Token usado:', token ? 'Existe ✅' : 'No existe ❌');
  if (token) {
    console.log('🔑 Token (primeros 30 chars):', token.substring(0, 30) + '...');
    console.log('🔑 Header completo:', `Bearer ${token.substring(0, 30)}...`);
  }
  
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ==========================================
// OBTENER TODOS LOS PRODUCTOS (público)
// ==========================================
export const obtenerProductos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// ==========================================
// OBTENER UN PRODUCTO POR ID (público)
// ==========================================
export const obtenerProductoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

// ==========================================
// CREAR PRODUCTO (requiere token ADMIN)
// ==========================================
export const crearProducto = async (producto) => {
  try {
    const response = await axios.post(
      API_URL,
      producto,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

// ==========================================
// ACTUALIZAR PRODUCTO (requiere token ADMIN)
// ==========================================
export const actualizarProducto = async (id, producto) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      producto,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

// ==========================================
// ELIMINAR PRODUCTO (requiere token ADMIN)
// ==========================================
export const eliminarProducto = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${id}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};