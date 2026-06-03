
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem("usuarioActual")) || null;
}

function guardarUsuarioActual(usuario) {
    let usuarios = obtenerUsuarios();
    // se modifica por que siempre esta guardando el usuario sin validar si existe o no en la bd.
    usuarios = usuarios.map(u => {
        if (u.documentNumber === usuario.documentNumber) {        
            // ahora se valida antes de guardar el usuario en la bd y se añaden las misiones guardadas para el usuario
            if (!u.misiones){
                usuario.misiones = misiones;
            }else if(!usuario.misiones) {
                usuario.misiones = u.misiones;    
            }
            localStorage.setItem("usuarioActual", JSON.stringify(usuario));
            return usuario; 
        }
        return u; 
    });

    guardarUsuarios(usuarios);
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
}

function estaLogueado() {
    return obtenerUsuarioActual() !== null;
}

function actualizarUsuario(usuarioActualizado) {

    if (!usuarioActualizado) return;

    let usuarios = obtenerUsuarios();

    usuarios = usuarios.map(usuario => {
        if (usuario.documentNumber === usuarioActualizado.documentNumber) {
            return usuarioActualizado;
        }
        return usuario;
    });

    guardarUsuarios(usuarios);
    guardarUsuarioActual(usuarioActualizado);
}

function sumarPuntos(puntos) {

    let usuario = obtenerUsuarioActual();
    if (!usuario) return;

    usuario.puntos += puntos;
    usuario.nivel = Math.floor(usuario.puntos / 100) + 1;

    actualizarUsuario(usuario);
}

function sumarJuegoJugado() {

    let usuario = obtenerUsuarioActual();
    if (!usuario) return;

    usuario.juegosJugados++;

    actualizarUsuario(usuario);
}

function sumarEstudiantesAyudados(cantidad = 1) {

    let usuario = obtenerUsuarioActual();
    if (!usuario) return;

    usuario.estudiantesAyudados += cantidad;

    actualizarUsuario(usuario);
}

function sumarMisionCompletada() {

    let usuario = obtenerUsuarioActual();
    if (!usuario) return;

    usuario.misionesCompletadas++;

    actualizarUsuario(usuario);
}

function sumarLogroDesbloqueado() {

    let usuario = obtenerUsuarioActual();
    if (!usuario) return;

    usuario.logrosDesbloqueados++;

    actualizarUsuario(usuario);
}

function protegerPagina() {
    if (!estaLogueado()) {
        window.location.href = "login.html";
    }
}

const misiones = [
  {
    id: 1,
    nombre: "Primer Paso",
    requerimiento: "Jugar por primera vez",
    valorRequerimiento: 1,
    puntos: 20,
    juego: "Desafío Matemático",
    progreso: 0,
    tipoMision: "partidas"
  },
  {
    id: 2,
    nombre: "Jugador Frecuente",
    requerimiento: "Jugar 5 partidas",
    valorRequerimiento: 5,
    puntos: 50,
    juego: "Desafío Matemático",
    progreso: 0,
    tipoMision: "partidas"
  },
  {
    id: 3,
    nombre: "Matemático Experto",
    requerimiento: "Resolver 8 desafíos correctamente",
    valorRequerimiento: 8,
    puntos: 75,
    juego: "Desafío Matemático",
    progreso: 0,
    tipoMision: "completar"
  },
  {
    id: 4,
    nombre: "Campeón de Rondas",
    requerimiento: "Ganar 3 rondas consecutivas",
    valorRequerimiento: 3,
    puntos: 90,
    juego: "Desafío Matemático",
    progreso: 0,
    tipoMision: "ganar"
  },
  {
    id: 5,
    nombre: "Leyenda Matemática",
    requerimiento: "Completar 10 desafíos sin errores",
    valorRequerimiento: 10,
    puntos: 100,
    juego: "Desafío Matemático",
    progreso: 0,
    tipoMision: "completar"
  }
];

function renderMisiones(containerId = "missions-container") {
  const container = document.getElementById(containerId);
  if (!container) return;
  const usuario =obtenerUsuarioActual();
  // se limpia el contenedor html para prevenir duplicados
  container.innerHTML = ""; 

  // se lee la lista de misiones y se crear el codigo html para ser agregado en la pagina web.
  usuario.misiones.forEach(mision => {
    const porcentaje = (mision.progreso / mision.valorRequerimiento) * 100;

    const card = document.createElement("div");
    card.className = "mission-card";

    card.innerHTML = `
      <div class="mission-top">
        <div>
          <h4>${mision.nombre}</h4>
          <small>${mision.requerimiento}</small>
        </div>
        <span class="reward">🏆 ${mision.puntos} pts</span>
      </div>
      <div class="progress-text">${mision.progreso} / ${mision.valorRequerimiento}</div>
      <div class="progress-bar">
        <div style="width:${porcentaje}%"></div>
      </div>
    `;

    container.appendChild(card);
  });
}