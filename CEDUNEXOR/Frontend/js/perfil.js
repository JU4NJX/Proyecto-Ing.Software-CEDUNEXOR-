document.addEventListener("DOMContentLoaded", () => {

    const usuario = obtenerUsuarioActual();

    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    const puntos = usuario.puntos || 0;
    const juegos = usuario.juegosJugados || 0;
    const estudiantes = usuario.estudiantesAyudados || 0;

    const nombre = document.getElementById("nombreUsuario");
    const puntosEl = document.getElementById("puntosTotales");
    const juegosEl = document.getElementById("juegosJugados");
    const nivelEl = document.getElementById("nivelActual");
    const estudiantesEl = document.getElementById("estudiantesAyudados");
    const impacto = document.getElementById("impactoTexto");

    if (nombre) nombre.textContent = usuario.username || "Usuario";
    if (puntosEl) puntosEl.textContent = puntos;
    if (juegosEl) juegosEl.textContent = juegos;

    const nivel = Math.floor(puntos / 100) + 1;
    if (nivelEl) nivelEl.textContent = nivel;

    if (estudiantesEl) estudiantesEl.textContent = estudiantes;

    if (impacto) {
        impacto.textContent =
            `Tus ${puntos} puntos han contribuido a ayudar a ${estudiantes} estudiantes. ¡Sigue jugando para ayudar a más niños!`;
    }

    generarLogros(usuario);

    const btnVolver = document.querySelector(".btn-volver");

    if (btnVolver) {
        btnVolver.addEventListener("click", () => {
            window.history.back();
        });
    }

});

function generarLogros(usuario) {

    const puntos = usuario.puntos || 0;
    const juegos = usuario.juegosJugados || 0;
    const estudiantes = usuario.estudiantesAyudados || 0;

    const logros = [

        {
            nombre: "Primera Victoria",
            descripcion: "Juega tu primera partida",
            icono: "🏆",
            desbloqueado: juegos >= 1
        },
        {
            nombre: "Jugador Activo",
            descripcion: "Juega 10 partidas",
            icono: "🎮",
            desbloqueado: juegos >= 10
        },
        {
            nombre: "Veterano",
            descripcion: "Juega 50 partidas",
            icono: "🔥",
            desbloqueado: juegos >= 50
        },
        {
            nombre: "Coleccionista",
            descripcion: "Obtén 500 puntos",
            icono: "⭐",
            desbloqueado: puntos >= 500
        },
        {
            nombre: "Experto",
            descripcion: "Obtén 1000 puntos",
            icono: "🎖️",
            desbloqueado: puntos >= 1000
        },
        {
            nombre: "Maestro",
            descripcion: "Obtén 2500 puntos",
            icono: "👑",
            desbloqueado: puntos >= 2500
        },
        {
            nombre: "Leyenda",
            descripcion: "Obtén 5000 puntos",
            icono: "💎",
            desbloqueado: puntos >= 5000
        },
        {
            nombre: "Benefactor",
            descripcion: "Ayuda a 1 estudiante",
            icono: "❤️",
            desbloqueado: estudiantes >= 1
        },
        {
            nombre: "Gran Benefactor",
            descripcion: "Ayuda a 5 estudiantes",
            icono: "🌟",
            desbloqueado: estudiantes >= 5
        },
        {
            nombre: "Super Benefactor",
            descripcion: "Ayuda a 10 estudiantes",
            icono: "🚀",
            desbloqueado: estudiantes >= 10
        },
        {
            nombre: "Genio Matemático",
            descripcion: "Completa 25 juegos",
            icono: "🧠",
            desbloqueado: juegos >= 25
        },
        {
            nombre: "Campeón",
            descripcion: "Completa 100 juegos",
            icono: "🏅",
            desbloqueado: juegos >= 100
        }

    ];

    const desbloqueadosDiv = document.getElementById("achievementsUnlocked");
    const bloqueadosDiv = document.getElementById("achievementsLocked");

    if (!desbloqueadosDiv || !bloqueadosDiv) return;

    desbloqueadosDiv.innerHTML = "";
    bloqueadosDiv.innerHTML = "";

    let contador = 0;

    logros.forEach(logro => {

        if (logro.desbloqueado) {

            contador++;

            desbloqueadosDiv.innerHTML += `
                <div class="achievement gold">
                    <div class="a-icon">${logro.icono}</div>
                    <h4>${logro.nombre}</h4>
                    <p>${logro.descripcion}</p>
                </div>
            `;

        } else {

            bloqueadosDiv.innerHTML += `
                <div class="achievement locked">
                    <div>
                        <h4>🔒 Bloqueado</h4>
                        <p>${logro.descripcion}</p>
                    </div>
                </div>
            `;

        }

    });

    const contadorLogros = document.getElementById("contadorLogros");

    if (contadorLogros) {
        contadorLogros.textContent =
            `${contador} de ${logros.length} logros desbloqueados`;
    }
}