// ================== DATOS ==================

// Noticias
const noticias = [
  {
    titulo: "“Es un balde de agua fría”: el estudio mexicano BeWolf cree que el impuesto para los videojuegos violentos condenará a la escena indie",
    contenido: "Fundador de la compañía piensa que la nueva tarifa frenará el crecimiento de la industria en México. ...",
    imagen: "https://tse2.mm.bing.net/th/id/OIP.9z4pUeSdndLyJ4XwSy8SIwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    titulo: "GameHers: Chile logra tercer lugar en revolucionario torneo gamer femenino de Valorant en Latinoamérica",
    contenido: "Chile, agosto de 2025.- Un torneo del videojuego Valorant que contó con la participación de solo mujeres...",
    imagen: "https://th.bing.com/th/id/OIP.GI5CO0zW5UUNrGjF0r5yaQHaE7?w=283&h=187&c=7&r=0&o=7&pid=1.7&rm=3"
  },
  {
    titulo: "Se realizará la primera gran cumbre de la industria del gaming en Chile",
    contenido: "Por primera vez se llevará a cabo en Chile, Epic Win...",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXZfNiO3U2iDD06NUyN55hy3jO9Pkv1mrLw&s"
  }
];

// Reseñas
const reseñas = [
  {
    titulo: "Hollow Knight: Silksong - Reseña",
    genero: "Action RPG",
    puntuacion: 8.5,
    contenido: "Hollow Knight: Silksong no solo cumple con las expectativas, las supera con elegancia. Es más grande, más vibrante y más desafiante que su predecesor, sin perder el alma que lo hizo especial. Aunque algunos picos de dificultad y decisiones de control podrían incomodar a algunos jugadores, este título ofrece suficientes herramientas para adaptarse, aprender y conquistar. Team Cherry ha logrado una secuela que no se conforma con repetir fórmulas, Silksong se atreve a volar alto, a explorar nuevas alturas narrativas y mecánicas, y a exigir lo mejor del jugador. Sin duda se coloca entre los favoritos para llevarse el premio al Juego del Año ya que se trata de una obra que redefine lo que puede ser un metroidvania en esta generación.Black Myth: Wukong es una obra maestra visual que lleva la mitología china a nuevas alturas...",
    imagen: "https://i.3djuegos.com/juegos/16443/hollow_knight_silksong/fotos/ficha/hollow_knight_silksong-4790214.jpg",
    pros: [
      "Gráficos y diseño visual excepcionales",
      "Sistema de combate fluido y satisfactorio",
      "Rica narrativa basada en mitología china"
    ],
    contras: [
      "Algunos bugs ocasionales al lanzamiento",
      "Curva de dificultad irregular"
    ]
  },
  {
    titulo: "Baldur's Gate 3",
    genero: "RPG / Estrategia por turnos",
    puntuacion: 9.5,
    contenido: "Baldur's Gate 3 representa la evolución perfecta de los RPG clásicos...",
    imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/ba706e54d68d10a0eb6ab7c36cdad9178c58b7fb7bb03d28.png",
    pros: ["Narrativa excepcional", "Personajes profundos", "Sistema táctico perfeccionado"],
    contras: ["Puede resultar abrumador", "Requiere mucho tiempo"]
  },
  {
    titulo: "Spider-Man 2",
    genero: "Action / Aventura",
    puntuacion: 8.8,
    contenido: "Marvel's Spider-Man 2 eleva la franquicia a nuevas alturas...",
    imagen: "https://th.bing.com/th/id/OIP.lTtgfPwR2M0bFU3Dvi49cwHaNK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    pros: ["Mecánicas de swing perfeccionadas", "Historia emocionante"],
    contras: ["Misiones repetitivas", "Final apresurado"]
  }
];

// ================== FUNCIONES DE RENDER ==================

// Noticias
function crearElementoNoticia(noticia, index) {
  const item = document.createElement("div");
  item.classList.add("accordion-item");

  item.innerHTML = `
    <h2 class="accordion-header" id="headingNoticia${index}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
              data-bs-target="#collapseNoticia${index}" aria-expanded="false" aria-controls="collapseNoticia${index}">
        ${noticia.titulo}
      </button>
    </h2>
    <div id="collapseNoticia${index}" class="accordion-collapse collapse" aria-labelledby="headingNoticia${index}" data-bs-parent="#accordionNoticias">
      <div class="accordion-body">
        ${noticia.imagen ? `<img src="${noticia.imagen}" alt="${noticia.titulo}" class="news-image mb-2">` : ''}
        <p>${noticia.contenido}</p>
      </div>
    </div>
  `;
  return item;
}

function cargarNoticias() {
  const accordion = document.getElementById("accordionNoticias");
  if (!accordion) {
    console.error("No se encontró el contenedor de noticias");
    return;
  }
  accordion.innerHTML = '';
  noticias.forEach((noticia, index) => accordion.appendChild(crearElementoNoticia(noticia, index)));
}

// Reseñas
function crearElementoReseña(reseña, index) {
  const item = document.createElement("div");
  item.classList.add("accordion-item");

  const pros = reseña.pros.map(p => `<li>${p}</li>`).join("");
  const contras = reseña.contras.map(c => `<li>${c}</li>`).join("");

  item.innerHTML = `
    <h2 class="accordion-header" id="headingReseña${index}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
              data-bs-target="#collapseReseña${index}" aria-expanded="false" aria-controls="collapseReseña${index}">
        ${reseña.titulo} — ${reseña.genero} (${reseña.puntuacion}/10)
      </button>
    </h2>
    <div id="collapseReseña${index}" class="accordion-collapse collapse" aria-labelledby="headingReseña${index}" data-bs-parent="#accordionReseñas">
      <div class="accordion-body">
        ${reseña.imagen ? `<img src="${reseña.imagen}" alt="${reseña.titulo}" class="news-image mb-2">` : ''}
        <p>${reseña.contenido}</p>
        <strong>Pros:</strong>
        <ul>${pros}</ul>
        <strong>Contras:</strong>
        <ul>${contras}</ul>
      </div>
    </div>
  `;
  return item;
}

function cargarReseñas() {
  const accordion = document.getElementById("accordionReseñas");
  if (!accordion) {
    console.error("No se encontró el contenedor de reseñas");
    return;
  }
  accordion.innerHTML = '';
  reseñas.forEach((reseña, index) => accordion.appendChild(crearElementoReseña(reseña, index)));
}

// ================== UTILIDADES ==================
function manejarErrorImagen(img) {
  img.onerror = function() {
    this.src = 'https://via.placeholder.com/400x250/667eea/ffffff?text=Imagen+no+disponible';
    this.alt = 'Imagen no disponible';
  };
}

// ================== EVENTOS ==================
document.addEventListener('DOMContentLoaded', () => {
  cargarNoticias();
  cargarReseñas();

  // Manejo de errores en imágenes
  setTimeout(() => {
    document.querySelectorAll('.news-image').forEach(manejarErrorImagen);
  }, 100);
});
