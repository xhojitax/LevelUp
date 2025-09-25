document.addEventListener("DOMContentLoaded", () => {
  // Asegurar que la cuenta admin exista en localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (!usuarios.some(u => u.correo === "admin@levelup.cl")) {
    usuarios.push({
      nombre: "Administrador",
      correo: "admin@levelup.cl",
      contrasena: "Admin123!", // puedes cambiarla
      rol: "admin"
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // evita que se recargue la página

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const mensaje = document.getElementById("mensaje");

    // Validación básica de correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      mensaje.textContent = "❌ Por favor ingresa un correo válido.";
      mensaje.style.color = "red";
      return;
    }

    // Recuperar usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar si hay un usuario con ese correo y contraseña
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === correo && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      if (usuarioEncontrado.rol === "admin") {
        mensaje.textContent = "👑 Login exitoso. Bienvenido Administrador";
      } else {
        mensaje.textContent = "✅ Login exitoso. Bienvenido " + usuarioEncontrado.nombre;
      }
      mensaje.style.color = "green";

      // Guardar sesión (opcional)
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

      // Redirigir después de 1 segundo
      setTimeout(() => {
        window.location.href = "../html/Index.html"; 
      }, 1000);

    } else {
      mensaje.textContent = "❌ Correo o contraseña incorrectos.";
      mensaje.style.color = "red";
    }
  });
});