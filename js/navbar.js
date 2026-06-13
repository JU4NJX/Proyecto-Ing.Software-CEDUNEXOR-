document.addEventListener("DOMContentLoaded", () => {

    const usuario = obtenerUsuarioActual();

    const navLinks = document.getElementById("nav-links");
    const authArea = document.getElementById("auth-area");

    // =========================
    // VISITANTE
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
            <li><a href="admin.html">Panel de administrador</a></li>
            <li><a href="mensajes.html">Mensajes</a></li>
        `;

        authArea.innerHTML = `

            <div class="perfil-container">

                <span class="username">
                    ${usuario.username}
                </span>

                <div class="perfil-menu">

                    <img
                        src="src/Perfil.png"
                        alt="Perfil"
                        id="perfil-icon"
                    >

                    <div
                        class="menu-opciones"
                        id="menu-opciones"
                        style="display:none;"
                    >

                        <ul>

                            <li>
                                <a href="#" id="cerrar-sesion">
                                    Cerrar sesión
                                </a>
                            </li>

                        </ul>

                    </div>

                </div>

            </div>
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

        authArea.innerHTML = `

            <div class="perfil-container">

                <span class="username">
                    ${usuario.username}
                </span>

                <div class="perfil-menu">

                    <img
                        src="src/Perfil.png"
                        alt="Perfil"
                        id="perfil-icon"
                    >

                    <div
                        class="menu-opciones"
                        id="menu-opciones"
                        style="display:none;"
                    >

                        <ul>

                            <li>
                                <a href="perfil.html">
                                    Acceder al perfil
                                </a>
                            </li>

                            <li>
                                <a href="#" id="cerrar-sesion">
                                    Cerrar sesión
                                </a>
                            </li>

                        </ul>

                    </div>

                </div>

            </div>
        `;
    }

    // =========================
    // ABRIR / CERRAR MENU
    // =========================
    const perfilIcon =
        document.getElementById("perfil-icon");

    const menuOpciones =
        document.getElementById("menu-opciones");

    if (perfilIcon) {

        perfilIcon.addEventListener("click", () => {

            menuOpciones.style.display =
                menuOpciones.style.display === "none"
                    ? "block"
                    : "none";
        });
    }

    // =========================
    // CERRAR SESIÓN
    // =========================
    const cerrarSesion =
        document.getElementById("cerrar-sesion");

    if (cerrarSesion) {

        cerrarSesion.addEventListener("click", (e) => {

            e.preventDefault();

            localStorage.removeItem("usuarioActual");

            window.location.href = "login.html";
        });
    }

    // =========================
    // CERRAR MENU SI CLICK FUERA
    // =========================
    document.addEventListener("click", (e) => {

        if (
            menuOpciones &&
            perfilIcon &&
            e.target !== menuOpciones &&
            e.target !== perfilIcon &&
            !menuOpciones.contains(e.target)
        ) {

            menuOpciones.style.display = "none";
        }
    });

});