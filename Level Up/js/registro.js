document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();
  const confirmar = document.getElementById("confirmar").value.trim();
  const nacimiento = document.getElementById("nacimiento").value; // campo fecha
  const mensaje = document.getElementById("mensaje");

  // Calcular edad
  let edadOk = false;
  if (nacimiento) {
    const fechaNacimiento = new Date(nacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--; // ajustar si no ha cumplido años todavía
    }
    edadOk = edad >= 18;
  }

  if (!edadOk) {
    mensaje.textContent = "❌ Debes ser mayor de 18 años para registrarte.";
    mensaje.style.color = "red";
    return;
  }

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

  // localstorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Crear objeto con la información
  const nuevoUsuario = {
    nombre: nombre,
    correo: correo,
    contrasena: contrasena,
    nacimiento: nacimiento
  };

  // Agregar el nuevo usuario al array
  usuarios.push(nuevoUsuario);

  // Guardar de nuevo en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Mensaje de éxito
  mensaje.textContent = "✅ Registro exitoso para " + nombre + " con correo " + correo;
  mensaje.style.color = "green";

  // limpiar formulario
  document.getElementById("registerForm").reset();
});
