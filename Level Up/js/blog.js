const noticias = [
  {
    titulo: "“Es un balde de agua fría”: el estudio mexicano BeWolf cree que el impuesto para los videojuegos violentos condenará a la escena indie",
    contenido: "Fundador de la compañía piensa que la nueva tarifa frenará el crecimiento de la industria en México.El gobierno de México quiere imponer un impuesto de 8% a los videojuegos violentos. Los jugadores ya protestaron para intentar frenar esta iniciativa del Paquete Económico 2026, pues tienen claro que no hay relación directa entre los videojuegos y los índices de violencia que azotan al país. Los desarrolladores mexicanos también ya se pronunciaron al respecto."+
    "Entre ellos está Néstor Guadalupe García, fundador de BeWolf Studio. La compañía indie es responsable de Redd’s Runaway. Es un run and gun inspirado en el cuento Caperucita Roja, con entornos y enemigos basados en el Día de Muertos y Halloween. García considera que el impuesto a los videojuegos violentos del gobierno de Claudia Sheinbaum “es un balde de agua fría”. Considera que condenará a la escena independiente y que frenará el crecimiento de la industria en México."
    
     },
  {
    titulo: "GameHers: Chile logra tercer lugar en revolucionario torneo gamer femenino de Valorant en Latinoamérica",
    contenido: "Chile, agosto de 2025.- Un torneo del videojuego Valorant que contó con la participación de solo mujeres es la iniciativa pionera que impulsa Kotex®, en alianza con INFINITY Esports a través de GameHers, para posicionar al gaming femenino en Chile y Latinoamérica. Esta instancia tuvo su definición regional este 17 de agosto en Lima (Perú), con las representantes nacionales del equipo SkibidiTeam, logrando el tercer lugar del torneo."
    +"La competencia tuvo una primera fase clasificatoria en Latinoamérica durante las últimas cuatro semanas en distintos países de la región. En Chile, participaron diversos equipos femeninos y tras superar las llaves clasificatorias se alzaron como ganadoras las integrantes de SkibidiTeam, que representó de gran manera al país en tierras peruanas." 
    +"La participación femenina en el mundo gamer es un desafío que busca relevar Kotex® a través de la iniciativa GameHers, que surge como respuesta a un entorno donde 8 de cada 10 mujeres en Latinoamérica ha enfrentado acoso o discriminación al jugar, y donde muchas aún ocultan su identidad por temor a ser juzgadas, según un estudio de Etermax. Así lo respalda también el estudio Mujeres en VG 2025, que muestra que un 25,8% de las mujeres en Chile afirma haber enfrentado dificultades para acceder a oportunidades laborales o ha recibido salarios más bajos que sus pares hombres, mientras que el 63,4% indica que ha vivido discriminación o malos tratos dentro del ecosistema gamer."
    +" Patricia Hoyos, directora de Marketing de Kotex® y Plenitud® para Latinoamérica, plantea: “Nuestro propósito es empoderar a las mujeres en todos los ámbitos de su vida, promoviendo su progreso y confianza para alcanzar las metas. El gaming es un reflejo de ese camino: un espacio donde ellas están ganando terreno y demostrando su talento. Este torneo busca romper con los estereotipos. Queremos visibilizar su esfuerzo y crear una comunidad donde se sientan apoyadas, valoradas e inspiradas a seguir creciendo”."
    +" Durante las semifinales del sábado 16 de agosto, se realizó la campaña #NoTeMutees, iniciativa que buscó visibilizar y generar conciencia sobre el acoso digital que enfrentan muchas jugadoras, proyectando un video con ejemplos de comentarios hostiles frecuentes en el entorno gamer, que reflejan cómo esta realidad lleva a dos de cada tres mujeres a ocultar su identidad o a preferir el silencio durante el juego."
    +"El domingo 17, en tanto, se desarrolló la gran final que tuvo como protagonistas a los equipos Mascoticas (Costa Rica), PRX (Perú), SkibidiTeam (Chile), Lemon Team (Argentina) y Spike Girls (Colombia). Enfrentamiento de alto nivel y que se definió en favor de Lemon Team, quienes obtuvieron el título regional y un premio adicional de USD 5.000."
    +"Más que una competencia, Kotex® GameHers busca consolidarse como una plataforma regional que impulsa un cambio cultural en el gaming, promoviendo comunidades seguras, inclusivas y colaborativas, asumiendo el compromiso de acompañar a las mujeres en todos los espacios donde se expresan y se anuncia que esta es sólo la primera de muchas iniciativas para derribar prejuicios y abrir camino para las próximas generaciones.",    
  },
  {
    titulo: "Se realizará la primera gran cumbre de la industria del gaming en Chile ",
    contenido: " Por primera vez se llevará a cabo en Chile, Epic Win, instancia que propone reunir a los principales actores del ecosistema de la industria de los videojuegos, tanto a nivel local como internacional. El evento se realizará entre el 27 y el 29 de agosto en Movistar GameClub."+
    "En el marco de una iniciativa público-privada apoyada por CORFO, nace Epic Win 2025, la primera edición de un evento que busca consolidarse como la gran cumbre del gaming. Su objetivo es fomentar el desarrollo de la industria de los videojuegos y fortalecer los lazos entre sus principales actores. Este inédito encuentro internacional reunirá a destacados representantes del sector, tanto a nivel global como local."+
    "Desde la organización señalan que el foco de Epic Win es construir puentes entre los principales protagonistas del ecosistema gamer, generar redes de negocios y abrir nuevas oportunidades de alianzas. "+
    "El lugar del evento también tiene un rol importante, ya que se realizará en Movistar GameClub, la cadena de clubes más importante para el desarrollo del ecosistema gamer y tecnológico en Chile. Un punto de encuentro para toda la comunidad gamer, donde además de jugar, pueden participar en eventos como éste, que fortalecen más el posicionamiento del gaming en la industria local."+
    "“Epic Win es un espacio de encuentro del mundo gaming, segmento que ha ido abriendo camino lleno de oportunidades en los mercados nacionales e internacionales. En el marco del compromiso de Corfo con el fortalecimiento del ecosistema de las industrias creativas y digitales, es que surge esta iniciativa, en donde la industria, emprendedores, desarrolladores, academia y actores vinculados al mercado, se dan cita entorno al talento creativo, donde se compartirán aprendizajes, buenas prácticas, experiencias, nuevas oportunidades y desafíos, en donde la innovación y la colaboración son elementos clave”, señala Gloria Moya, Directora Regional de CORFO, Metropolitano."
    
  }
];

// Renderizar noticias en acordeón
const accordion = document.getElementById("accordionNoticias");

noticias.forEach((noticia, index) => {
  const item = document.createElement("div");
  item.classList.add("accordion-item");

  item.innerHTML = `
    <h2 class="accordion-header" id="heading${index}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
              data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
        ${noticia.titulo}
      </button>
    </h2>
    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionNoticias">
      <div class="accordion-body">
        <p>${noticia.contenido}</p>
        
      </div>
    </div>
  `;

  accordion.appendChild(item);
});
