document.addEventListener("DOMContentLoaded", () => {

    const usuario = obtenerUsuarioActual();

    const navLinks = document.getElementById("nav-links");
    const authArea = document.getElementById("auth-area");

    // =========================
    // NO LOGUEADO
    // =========================
    if (!usuario) {

        navLinks.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="contactanos.html">Contactanos</a></li>
            <li><a href="register.html"><b>Registrarse</b></a></li>
        `;

        authArea.innerHTML = `
            <a class="btn" href="login.html">
                <button>Iniciar Sesión</button>
            </a>
        `;

        return;
    }

    // =========================
    // ADMIN
    // =========================
    if (usuario.role === "admin") {

        navLinks.innerHTML = `
            <li><a href="admin.html">Panel Admin</a></li>
            <li><a href="mensajes.html">Mensajes</a></li>
        `;
    }

    // =========================
    // USUARIO NORMAL
    // =========================
    else {

        navLinks.innerHTML = `
            <li><a href="play.html">Inicio</a></li>
            <li><a href="tienda.html">Tienda</a></li>
            <li><a href="carrito.html">Carrito</a></li>
        `;
    }

    // =========================
    // PERFIL
    // =========================

    if (usuario.role === "usuario") {
        authArea.innerHTML = `
        <div class="perfil-container">
            <span class="username">${usuario.username}</span>

            <div class="perfil-menu">

                <img src="src/Perfil.png" alt="Perfil" id="perfil-icon">

                <div class="menu-opciones" id="menu-opciones" style="display:none;">

                    <ul>
                        <li><a href="perfil.html">Acceder al perfil</a></li>
                        <li><a href="#" id="cerrar-sesion">Cerrar sesión</a></li>
                    </ul>

                </div>

            </div>
        </div>
    `;
    }
    else {
        authArea.innerHTML = `
        <div class="perfil-container">
            <span class="username">${usuario.username}</span>

            <div class="perfil-menu">

                <img src="src/Perfil.png" alt="Perfil" id="perfil-icon">

                <div class="menu-opciones" id="menu-opciones" style="display:none;">

                    <ul>
                        <li><a href="#" id="cerrar-sesion">Cerrar sesión</a></li>
                    </ul>

                </div>

            </div>
        </div>
    `;
    }

    // =========================
    // ABRIR / CERRAR MENU PERFIL
    // =========================
    document.getElementById("perfil-icon").addEventListener("click", () => {

    const menu = document.getElementById("menu-opciones");

    menu.style.display =
        menu.style.display === "none" ? "block" : "none";
});

// =========================
// CERRAR SESIÓN
// =========================
document.getElementById("cerrar-sesion").addEventListener("click", (e) => {

    e.preventDefault();

    localStorage.removeItem("usuarioActual");

    window.location.href = "login.html";
});

// =========================
// CERRAR MENU SI SE HACE CLICK FUERA
// =========================
document.addEventListener("click", (e) => {

    const menu = document.getElementById("menu-opciones");
    const icon = document.getElementById("perfil-icon");

    if (
        menu &&
        e.target !== menu &&
        e.target !== icon &&
        !menu.contains(e.target)
    ) {
        menu.style.display = "none";
    }
});

});