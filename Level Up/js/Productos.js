document.addEventListener('DOMContentLoaded', () => {

  // --- FILTRO DE PRODUCTOS ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Quitar clase activa a todos los botones
      filterBtns.forEach(b => b.classList.remove('active'));
      // Activar solo el botón clicado
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      products.forEach(product => {
        if (filter === 'all' || product.getAttribute('data-category') === filter) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });

  // --- AGREGAR AL CARRITO ---
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));
      const img = button.getAttribute('data-img');

      // Obtener carrito del localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Comprobar si el producto ya existe
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.cantidad += 1; // Incrementa cantidad
      } else {
        cart.push({ name, price, cantidad: 1, img }); // Agrega producto nuevo
      }

      // Guardar carrito actualizado
      localStorage.setItem('cart', JSON.stringify(cart));

      alert(`${name} agregado al carrito 🛒`);
    });
  });

});
