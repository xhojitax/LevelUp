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
  // Validar que la contraseña sea segura
  const regexSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,}$/;
  if (!regexSegura.test(contrasena)) {
    mensaje.textContent = "❌ La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
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

  // Recuperar usuarios existentes del localStorage (si no hay, queda array vacío)
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Crear objeto con la información
  const nuevoUsuario = {
    nombre: nombre,
    correo: correo,
    contrasena: contrasena
  };

  // Agregar el nuevo usuario al array
  usuarios.push(nuevoUsuario);

  // Guardar de nuevo en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Mensaje de éxito
  mensaje.textContent = "✅ Registro exitoso para " + nombre + " con correo " + correo;
  mensaje.style.color = "green";

  // Opcional: limpiar formulario
  document.getElementById("registerForm").reset();
});
