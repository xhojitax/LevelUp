document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const respuesta = document.getElementById('respuesta');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombre === '' || email === '' || mensaje === '') {
      respuesta.textContent = 'Por favor, completa todos los campos.';
      respuesta.style.color = 'red';
      return;
    }

    // Simula un envío correcto
    setTimeout(() => {
      respuesta.textContent = '¡Mensaje enviado con éxito! Pronto te contactaremos.';
      respuesta.style.color = '#0ff';
      form.reset();
    }, 500);
  });
});