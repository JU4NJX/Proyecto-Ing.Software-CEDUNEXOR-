document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        // =========================
        // OBTENER DATOS DEL FORMULARIO
        // =========================
        const nombre = document.getElementById("name").value;
        const correo = document.getElementById("email").value;
        const asunto = document.getElementById("asunto").value;
        const mensaje = document.getElementById("message").value;

        // =========================
        // OBTENER USUARIO ACTUAL
        // =========================
        const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

        // =========================
        // CREAR OBJETO MENSAJE
        // =========================
        const nuevoMensaje = {

            nombre: nombre,
            correo: correo,
            asunto: asunto,
            mensaje: mensaje,

            fecha: new Date().toLocaleString(),

            logueado: usuarioActual ? true : false,

            usuario: usuarioActual ? usuarioActual.username : null
        };

        // =========================
        // OBTENER MENSAJES GUARDADOS
        // =========================
        const mensajesGuardados =
            JSON.parse(localStorage.getItem("mensajes")) || [];

        // =========================
        // AGREGAR NUEVO MENSAJE
        // =========================
        mensajesGuardados.push(nuevoMensaje);

        // =========================
        // GUARDAR EN LOCALSTORAGE
        // =========================
        localStorage.setItem(
            "mensajes",
            JSON.stringify(mensajesGuardados)
        );

        // =========================
        // MENSAJE DE CONFIRMACIÓN
        // =========================
        alert("Mensaje enviado correctamente");

        // =========================
        // LIMPIAR FORMULARIO
        // =========================
        form.reset();

    });

});