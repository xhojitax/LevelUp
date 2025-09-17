// Variables para controlar los carruseles
const carruseles = {
    perifericos: { indice: 0, total: 0 },
    accesorios: { indice: 0, total: 0 }
};

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    inicializarCarruseles();
    configurarFiltros();
    configurarBotonesCarrusel();
    configurarBotonesAgregar();
});

// Configurar los filtros de categorías
function configurarFiltros() {
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', function() {
            const filtro = this.getAttribute('data-filtro');
            filtrarProductos(filtro);
            
            // Actualizar estado activo de los botones
            botonesFiltro.forEach(btn => btn.classList.remove('activo'));
            this.classList.add('activo');
        });
    });
}

// Función para filtrar productos por categoría
function filtrarProductos(categoria) {
    const secciones = document.querySelectorAll('.seccion-productos');
    
    secciones.forEach(seccion => {
        if (categoria === 'todos') {
            seccion.classList.remove('oculta');
        } else {
            const categoriaSeccion = seccion.getAttribute('data-categoria');
            if (categoriaSeccion === categoria) {
                seccion.classList.remove('oculta');
            } else {
                seccion.classList.add('oculta');
            }
        }
    });
}

// Inicializar carruseles
function inicializarCarruseles() {
    Object.keys(carruseles).forEach(nombre => {
        const carrusel = document.getElementById(`carrusel-${nombre}`);
        if (carrusel) {
            const productos = carrusel.querySelectorAll('.producto-card');
            carruseles[nombre].total = productos.length;
            carruseles[nombre].indice = 0;
        }
    });
}

// Configurar botones de navegación del carrusel
function configurarBotonesCarrusel() {
    const botones = document.querySelectorAll('.btn-carrusel');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const carruselNombre = this.getAttribute('data-carrusel');
            const esPrev = this.classList.contains('btn-prev');
            
            if (esPrev) {
                moverCarrusel(carruselNombre, -1);
            } else {
                moverCarrusel(carruselNombre, 1);
            }
        });
    });
}

// Función para mover el carrusel
function moverCarrusel(nombreCarrusel, direccion) {
    const carrusel = document.getElementById(`carrusel-${nombreCarrusel}`);
    if (!carrusel) return;
    
    const config = carruseles[nombreCarrusel];
    const anchoProducto = 320; // 300px + 20px de gap
    
    // Calcular nuevo índice
    config.indice += direccion;
    
    // Límites del carrusel
    if (config.indice < 0) {
        config.indice = 0;
    } else if (config.indice >= config.total - 1) {
        config.indice = config.total - 1;
    }
    
    // Aplicar transformación
    const desplazamiento = config.indice * anchoProducto;
    carrusel.style.transform = `translateX(-${desplazamiento}px)`;
}

// Configurar botones "Agregar al carrito"
function configurarBotonesAgregar() {
    const botones = document.querySelectorAll('.btn-agregar');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const card = this.closest('.producto-card');
            const nombreProducto = card.querySelector('h4').textContent;
            const precio = card.querySelector('.precio').textContent;
            const inputCantidad = card.querySelector('input[type="number"]');
            const cantidad = inputCantidad.value;
            
            // Mostrar confirmación
            mostrarNotificacion(`${nombreProducto} (${cantidad} unidad${cantidad > 1 ? 'es' : ''}) agregado al carrito - ${precio}`);
            
            // Efecto visual en el botón
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    
    // Estilos de la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #00b894, #55efc4);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 184, 148, 0.4);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Agregar al body
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida y eliminar
    setTimeout(() => {
        notificacion.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Función para navegación con teclado (opcional)
document.addEventListener('keydown', function(e) {
    // Navegar carrusel con flechas del teclado cuando esté enfocado
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const carruselActivo = document.querySelector('.carrusel-container:hover');
        if (carruselActivo) {
            const carrusel = carruselActivo.querySelector('.carrusel');
            const nombreCarrusel = carrusel.id.replace('carrusel-', '');
            
            if (e.key === 'ArrowLeft') {
                moverCarrusel(nombreCarrusel, -1);
            } else {
                moverCarrusel(nombreCarrusel, 1);
            }
        }
    }
});

// Función para autoplay del carrusel (opcional)
function iniciarAutoplay(nombreCarrusel, intervalo = 5000) {
    setInterval(() => {
        moverCarrusel(nombreCarrusel, 1);
        
        // Si llegó al final, volver al inicio
        if (carruseles[nombreCarrusel].indice >= carruseles[nombreCarrusel].total - 1) {
            setTimeout(() => {
                carruseles[nombreCarrusel].indice = -1;
                moverCarrusel(nombreCarrusel, 1);
            }, 1000);
        }
    }, intervalo);
}
// Iniciar autoplay para ambos carruseles
iniciarAutoplay('perifericos');
iniciarAutoplay('accesorios');
