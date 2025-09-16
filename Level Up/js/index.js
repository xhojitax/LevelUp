// Espera a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona el carrusel por ID
  const myCarouselElement = document.querySelector('#carouselExample');

  // Opciones del carrusel
  const carousel = new bootstrap.Carousel(myCarouselElement, {
    interval: 3000, // cambia cada 3 segundos
    pause: false    // no se pausa al pasar el mouse
  });

  // Si quieres puedes pausar/reanudar desde JS:
  // carousel.pause();
  // carousel.cycle();
});