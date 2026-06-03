// ===============================
// USUARIOS (BASE DE DATOS LOCAL)
// ===============================

const ADMIN_USER = {
    documentType: "cc",
    documentNumber: "999999999",
    email: "admin@mock.com",
    username: "adminUser",
    password: "admin1234",
    role: "admin",
    puntos: 0,
    juegosJugados: 0,
    estudiantesAyudados: 0,
    nivel: 99,
    misionesCompletadas: 0,
    logrosDesbloqueados: 0,
    misiones: []
};

// asegura que el admin SIEMPRE exista
function initAdmin() {
    let usuarios = obtenerUsuarios();

    const existeAdmin = usuarios.some(
        u => u.documentNumber === ADMIN_USER.documentNumber
    );

    if (!existeAdmin) {
        usuarios.push(ADMIN_USER);
        guardarUsuarios(usuarios);
    }
}

// ===============================
// CRUD USUARIOS
// ===============================

function obtenerUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    return usuarios;
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
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
}

function estaLogueado() {
    return obtenerUsuarioActual() !== null;
}

// ===============================
// ACTUALIZAR USUARIO EN "BD"
// ===============================

function actualizarUsuario(usuarioActualizado) {

    let usuarios = obtenerUsuarios();

    usuarios = usuarios.map(u => {
        if (u.documentNumber === usuarioActualizado.documentNumber) {
            return usuarioActualizado;
        }
        return u;
    });

    guardarUsuarios(usuarios);
    guardarUsuarioActual(usuarioActualizado);
}

// ===============================
// PROGRESO USUARIO
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
// PROTEGER PÁGINAS
// ===============================

function protegerPagina() {
    if (!estaLogueado()) {
        window.location.href = "login.html";
    }
}

// ===============================
// MISIONES BASE
// ===============================

const misiones = [
    {
        id: 1,
        nombre: "Primer Paso",
        requerimiento: "Jugar por primera vez",
        valorRequerimiento: 1,
        puntos: 20,
        juego: "Desafío Matemático",
        progreso: 0,
        tipoMision: "partidas",
        fechaCompletada: ""
    },
    {
        id: 2,
        nombre: "Jugador Frecuente",
        requerimiento: "Jugar 5 partidas",
        valorRequerimiento: 5,
        puntos: 50,
        juego: "Desafío Matemático",
        progreso: 0,
        tipoMision: "partidas",
        fechaCompletada: ""
    }
];

// ===============================
// INICIALIZACIÓN AUTOMÁTICA
// ===============================

// ejecuta admin fijo al cargar script
initAdmin();