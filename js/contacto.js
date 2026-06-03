document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".contact-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuarioActual = obtenerUsuarioActual();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const asunto = document.getElementById("asunto").value.trim();
        const message = document.getElementById("message").value.trim();

        // =========================
        // VALIDACIÓN
        // =========================
        if (!name || !email || !asunto || !message) {
            alert("Por favor completa todos los campos.");
            return;
        }

        // =========================
        // MENSAJE ESTRUCTURADO
        // =========================
        const mensaje = {
            usuario: usuarioActual?.username || name,
            email: usuarioActual?.email || email,
            asunto,
            mensaje: message,
            fecha: new Date().toLocaleString()
        };

        // =========================
        // GUARDAR EN LOCALSTORAGE
        // =========================
        let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

        mensajes.push(mensaje);

        localStorage.setItem("mensajes", JSON.stringify(mensajes));

        // =========================
        // FEEDBACK
        // =========================
        alert("Mensaje enviado correctamente ✔");

        form.reset();

    });

});