
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// ===============================
// SESIÓN
// ===============================

function obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem("usuarioActual")) || null;
}

function guardarUsuarioActual(usuario) {
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    // sincronizar con lista de usuarios
    let usuarios = obtenerUsuarios();

    usuarios = usuarios.map(u =>
        u.documentNumber === usuario.documentNumber ? usuario : u
    );

    guardarUsuarios(usuarios);
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
}

function estaLogueado() {
    return obtenerUsuarioActual() !== null;
}

// ===============================
// ACTUALIZAR USUARIO
// ===============================

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

// ===============================
// PROGRESO
// ===============================

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

// ===============================
// PROTECCIÓN
// ===============================

function protegerPagina() {
    if (!estaLogueado()) {
        window.location.href = "login.html";
    }
}