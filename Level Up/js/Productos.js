document.addEventListener('DOMContentLoaded', () => {

    // --- Variables globales para el carrito ---
    // Intentamos cargar el carrito desde localStorage, si no existe, inicializamos un array vacío.
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorProductos = document.querySelector('.carrito-items');
    const totalElemento = document.getElementById('total');
    const finalizarCompraBtn = document.getElementById('finalizarCompra');

    // --- Funciones del catálogo (para Productos.html) ---
    function agregarProductoAlCarrito(e) {
        // Obtenemos el contenedor del producto padre (la tarjeta)
        const item = e.target.closest('.producto-card');
        
        if (item) {
            // Extraemos la información del producto de los elementos HTML
            const producto = {
                id: item.querySelector('h3').textContent, // Usamos el nombre como ID simple
                nombre: item.querySelector('h3').textContent,
                precio: parseFloat(item.querySelector('span').textContent.replace('$', '').replace('.', '')),
                imagen: item.querySelector('img').src,
            };

            // Agregamos el producto al array del carrito
            carrito.push(producto);
            
            // Guardamos el carrito actualizado en el almacenamiento local
            guardarCarritoEnLocalStorage();
            
            // Damos una alerta al usuario
            alert(`✅ ¡"${producto.nombre}" ha sido agregado al carrito!`);
        }
    }

    // --- Funciones del carrito (para Carrito.html) ---
    function renderizarCarrito() {
        // Limpiamos el contenedor antes de renderizar
        if (contenedorProductos) {
            contenedorProductos.innerHTML = '';
        }

        let total = 0;

        // Recorremos cada producto en el array del carrito
        carrito.forEach((producto, index) => {
            // Creamos los elementos HTML para cada producto
            const itemHTML = document.createElement('div');
            itemHTML.classList.add('item');
            itemHTML.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="item-info">
                    <h3>${producto.nombre}</h3>
                    <span>$${producto.precio.toLocaleString('es-CL')}</span>
                </div>
                <div class="item-actions">
                    <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                </div>
            `;
            // Agregamos el HTML al contenedor del carrito
            if (contenedorProductos) {
                contenedorProductos.appendChild(itemHTML);
            }
            // Sumamos al total
            total += producto.precio;
        });

        // Actualizamos el total en el HTML
        if (totalElemento) {
            totalElemento.textContent = total.toLocaleString('es-CL');
        }
    }

    function eliminarProductoDelCarrito(e) {
        // Verificamos si el botón clickeado tiene la clase 'btn-eliminar'
        if (e.target.classList.contains('btn-eliminar')) {
            // Obtenemos el índice del producto a eliminar
            const index = e.target.dataset.index;
            
            // Eliminamos el producto del array del carrito
            carrito.splice(index, 1);
            
            // Guardamos los cambios y volvemos a renderizar el carrito
            guardarCarritoEnLocalStorage();
            renderizarCarrito();
        }
    }

    function finalizarCompra() {
        // Vaciamos el array del carrito
        carrito = [];
        
        // Guardamos el carrito vacío y renderizamos para limpiar la vista
        guardarCarritoEnLocalStorage();
        renderizarCarrito();
        
        alert('🎉 ¡Gracias por tu compra! El carrito ha sido vaciado.');
    }
    
    // --- Funciones auxiliares ---
    function guardarCarritoEnLocalStorage() {
        // Convierte el array de JavaScript a una cadena JSON y lo guarda
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // --- Eventos y lógica de inicialización ---

    // Lógica para la página de productos (Productos.html)
    // Busca todos los botones "Agregar" y les añade un 'listener'
    const botonesAgregar = document.querySelectorAll('.producto-actions button');
    if (botonesAgregar.length > 0) {
        botonesAgregar.forEach(button => {
            button.addEventListener('click', agregarProductoAlCarrito);
        });
    }

    // Lógica para la página del carrito (Carrito.html)
    if (contenedorProductos) {
        renderizarCarrito();
        contenedorProductos.addEventListener('click', eliminarProductoDelCarrito);
    }
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', finalizarCompra);
    }
});