// Simulación de productos en el carrito
const productos = [
  { id: 1, nombre: 'Juego RPG', precio: 29990, cantidad: 1, img: 'https://via.placeholder.com/80' },
  { id: 2, nombre: 'Juego Acción', precio: 19990, cantidad: 2, img: 'https://via.placeholder.com/80' },
];

const carritoItems = document.getElementById('carritoItems');
const totalSpan = document.getElementById('total');

// Renderiza el carrito
function renderCarrito() {
  carritoItems.innerHTML = '';
  let total = 0;

  productos.forEach((prod, index) => {
    total += prod.precio * prod.cantidad;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    itemDiv.innerHTML = `
      <img src="${prod.img}" alt="${prod.nombre}">
      <div class="item-info">
        <h3>${prod.nombre}</h3>
        <p>Precio: $${prod.precio.toLocaleString()}</p>
      </div>
      <div class="item-actions">
        <input type="number" min="1" value="${prod.cantidad}" data-index="${index}" class="cantidad">
        <button class="eliminar" data-index="${index}">Eliminar</button>
      </div>
    `;
    carritoItems.appendChild(itemDiv);
  });

  totalSpan.textContent = total.toLocaleString();
}

// Cambiar cantidad
carritoItems.addEventListener('input', (e) => {
  if (e.target.classList.contains('cantidad')) {
    const index = e.target.dataset.index;
    productos[index].cantidad = parseInt(e.target.value);
    renderCarrito();
  }
});

// Eliminar producto
carritoItems.addEventListener('click', (e) => {
  if (e.target.classList.contains('eliminar')) {
    const index = e.target.dataset.index;
    productos.splice(index, 1);
    renderCarrito();
  }
});

// Finalizar compra
document.getElementById('finalizarCompra').addEventListener('click', () => {
  if (productos.length === 0) {
    alert('Tu carrito está vacío');
  } else {
    alert('¡Gracias por tu compra!');
    productos.length = 0;
    renderCarrito();
  }
});

// Inicializa
renderCarrito();