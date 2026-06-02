function obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem("usuarioActual"));
}

function guardarUsuarioActual(usuario) {
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    // también actualizar en lista de usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios = usuarios.map(u =>
        u.documentNumber === usuario.documentNumber ? usuario : u
    );

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

/* =========================
   SUMAR PUNTOS
========================= */

function agregarPuntos(cantidad) {

    let usuario = obtenerUsuarioActual();
    if (!usuario) return;

    usuario.puntos += cantidad;

    usuario.nivel = Math.floor(usuario.puntos / 100) + 1;

    guardarUsuarioActual(usuario);
}

/* =========================
   SUMAR JUEGO JUGADO
========================= */

function agregarJuegoJugado() {

    let usuario = obtenerUsuarioActual();
    if (!usuario) return;

    usuario.juegosJugados++;

    guardarUsuarioActual(usuario);
}

/* =========================
   ESTUDIANTE AYUDADO
========================= */

function agregarEstudianteAyudado() {

    let usuario = obtenerUsuarioActual();
    if (!usuario) return;

    usuario.estudiantesAyudados++;

    guardarUsuarioActual(usuario);
}

/* =========================
   MISIÓN
========================= */

function completarMision() {

    let usuario = obtenerUsuarioActual();
    if (!usuario) return;

    usuario.misionesCompletadas++;

    guardarUsuarioActual(usuario);
}

/* =========================
   LOGRO
========================= */

function desbloquearLogro() {

    let usuario = obtenerUsuarioActual();
    if (!usuario) return;

    usuario.logrosDesbloqueados++;

    guardarUsuarioActual(usuario);
}