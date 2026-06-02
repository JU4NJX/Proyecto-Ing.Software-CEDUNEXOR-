document.addEventListener("DOMContentLoaded", () => {

    const usuario = obtenerUsuarioActual();

    const navLinks = document.getElementById("nav-links");
    const authArea = document.getElementById("auth-area");

    // =========================
    // 🔓 NO LOGUEADO
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
    // 🔒 LOGUEADO
    // =========================
    navLinks.innerHTML = `
        <li><a href="play.html">Inicio</a></li>
        <li><a href="tienda.html">Tienda</a></li>
        <li><a href="carrito.html">Carrito</a></li>
    `;

    authArea.innerHTML = `
        <div class="perfil-container">

            <span class="username">${usuario.username}</span>

            <a class="perfil" href="perfil.html">
                <img src="src/Perfil.png" alt="Perfil">
            </a>

        </div>
    `;

});