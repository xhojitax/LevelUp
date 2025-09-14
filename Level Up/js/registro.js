document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();
  const confirmar = document.getElementById("confirmar").value.trim();
  const mensaje = document.getElementById("mensaje");

  // Validar que las contraseñas coincidan
  if (contrasena !== confirmar) {
    mensaje.textContent = "❌ Las contraseñas no coinciden.";
    mensaje.style.color = "red";
    return;
  }

  // Validación de correo simple
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo)) {
    mensaje.textContent = "❌ Por favor ingresa un correo válido.";
    mensaje.style.color = "red";
    return;
  }

  // Si pasa todas las validaciones
  mensaje.textContent = "✅ Registro exitoso para " + nombre + " con correo " + correo;
  mensaje.style.color = "green";
});