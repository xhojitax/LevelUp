document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // evita que se recargue la página

    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const mensaje = document.getElementById("mensaje");

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(correo)) {
      mensaje.textContent = "Por favor ingresa un correo válido.";
      mensaje.style.color = "red";
      return;
    }

    if (correo === "admin@levelup.com" && contrasena === "1234") {
      mensaje.textContent = "✅ Login exitoso. Bienvenido " + correo;
      mensaje.style.color = "green";
    } else {
      mensaje.textContent = "❌ Correo o contraseña incorrectos.";
      mensaje.style.color = "red";
    }
  });
});
