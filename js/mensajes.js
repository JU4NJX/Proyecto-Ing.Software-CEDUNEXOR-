document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // VALIDAR ADMIN
    // =========================
    const usuarioActual =
        JSON.parse(localStorage.getItem("usuarioActual"));

    if (!usuarioActual || usuarioActual.role !== "admin") {

        window.location.href = "login.html";

        return;
    }

    // =========================
    // OBTENER MENSAJES
    // =========================
    let mensajes =
        JSON.parse(localStorage.getItem("mensajes")) || [];

    // =========================
    // MENSAJES ACTUALES
    // =========================
    let mensajesActuales = [...mensajes].reverse();

    // =========================
    // ELEMENTOS
    // =========================
    const listaMensajes =
        document.getElementById("lista-mensajes");

    const buscador =
        document.getElementById("buscar-mensaje");

    const filtroReciente =
        document.getElementById("filtro-reciente");

    const filtroAntiguo =
        document.getElementById("filtro-antiguo");

    const filtroLogueado =
        document.getElementById("filtro-logueado");

    const filtroVisitante =
        document.getElementById("filtro-visitante");

    // =========================
    // ACTIVAR FILTRO
    // =========================
    function activarFiltro(botonSeleccionado) {

        const botones =
            document.querySelectorAll(".filtro");

        botones.forEach(btn => {

            btn.classList.remove("activo");
        });

        botonSeleccionado.classList.add("activo");
    }

    // =========================
    // RENDER MENSAJES
    // =========================
    function renderMensajes(lista) {

        listaMensajes.innerHTML = "";

        // =========================
        // SIN MENSAJES
        // =========================
        if (lista.length === 0) {

            listaMensajes.innerHTML = `

                <div class="mensaje-item">

                    <h3>
                        No hay mensajes disponibles
                    </h3>

                </div>
            `;

            return;
        }

        // =========================
        // CREAR TARJETAS
        // =========================
        lista.forEach((msg) => {

            const card =
                document.createElement("div");

            card.classList.add("mensaje-item");

            card.innerHTML = `

                <div class="mensaje-top">

                    <h3>${msg.nombre}</h3>

                    <span>${msg.fecha}</span>

                </div>

                <p class="correo">
                    ${msg.correo}
                </p>

                <p class="preview">

                    ${msg.mensaje.substring(0, 100)}...

                </p>

                <span class="tag ${msg.logueado
                    ? "logueado"
                    : "visitante"
                }">

                    ${msg.logueado
                    ? "Usuario Logueado"
                    : "Visitante"
                }

                </span>
            `;

            // =========================
            // ABRIR MENSAJE
            // =========================
            card.addEventListener("click", () => {

                document.getElementById(
                    "mensaje-vacio"
                ).style.display = "none";

                document.getElementById(
                    "contenido-mensaje"
                ).style.display = "block";

                // =========================
                // DATOS
                // =========================
                document.getElementById(
                    "detalle-nombre"
                ).textContent = msg.nombre;

                document.getElementById(
                    "detalle-correo"
                ).textContent = msg.correo;

                document.getElementById(
                    "detalle-fecha"
                ).textContent = msg.fecha;

                document.getElementById(
                    "detalle-mensaje"
                ).textContent = msg.mensaje;

                // =========================
                // AVATAR
                // =========================
                document.getElementById(
                    "avatar-usuario"
                ).textContent =
                    msg.nombre.charAt(0).toUpperCase();

                // =========================
                // TAG
                // =========================
                const tag =
                    document.getElementById("detalle-tag");

                tag.textContent =
                    msg.logueado
                        ? "Usuario logueado"
                        : "Visitante";

                tag.className =
                    `tag ${msg.logueado
                        ? "logueado"
                        : "visitante"
                    }`;

                // =========================
                // RESPONDER EMAIL
                // =========================
                const asunto =
                    encodeURIComponent(
                        "Respuesta a tu mensaje"
                    );

                const cuerpo =
                    encodeURIComponent(
                        `Hola ${msg.nombre},

                        Gracias por contactarnos.

                        `
                    );

                document.getElementById(
                    "btn-responder"
                ).href =
                    `mailto:${msg.correo}?subject=${asunto}&body=${cuerpo}`;
            });

            listaMensajes.appendChild(card);
        });
    }

    // =========================
    // MOSTRAR MENSAJES
    // =========================
    renderMensajes(mensajesActuales);

    // =========================
    // FILTRO MÁS RECIENTE
    // =========================
    filtroReciente.addEventListener("click", () => {

        activarFiltro(filtroReciente);

        mensajesActuales =
            [...mensajes].reverse();

        renderMensajes(mensajesActuales);
    });

    // =========================
    // FILTRO MÁS ANTIGUO
    // =========================
    filtroAntiguo.addEventListener("click", () => {

        activarFiltro(filtroAntiguo);

        mensajesActuales =
            [...mensajes];

        renderMensajes(mensajesActuales);
    });

    // =========================
    // FILTRO LOGUEADOS
    // =========================
    filtroLogueado.addEventListener("click", () => {

        activarFiltro(filtroLogueado);

        mensajesActuales =
            mensajes.filter(
                msg => msg.logueado
            ).reverse();

        renderMensajes(mensajesActuales);
    });

    // =========================
    // FILTRO VISITANTES
    // =========================
    filtroVisitante.addEventListener("click", () => {

        activarFiltro(filtroVisitante);

        mensajesActuales =
            mensajes.filter(
                msg => !msg.logueado
            ).reverse();

        renderMensajes(mensajesActuales);
    });

    // =========================
    // BUSCADOR
    // =========================
    buscador.addEventListener("input", (e) => {

        const texto =
            e.target.value.toLowerCase();

        const resultados =
            mensajesActuales.filter(msg => {

                return (

                    msg.nombre
                        .toLowerCase()
                        .includes(texto)

                    ||

                    msg.correo
                        .toLowerCase()
                        .includes(texto)

                    ||

                    msg.asunto
                        .toLowerCase()
                        .includes(texto)

                    ||

                    msg.mensaje
                        .toLowerCase()
                        .includes(texto)
                );
            });

        renderMensajes(resultados);
    });

});
