document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".register-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const documentType = document.getElementById("document-type").value.trim();
        const documentNumber = document.getElementById("document-number").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();
        const adult = document.getElementById("adult").checked;

        if (
            !documentType ||
            !documentNumber ||
            !email ||
            !username ||
            !password ||
            !confirmPassword
        ) {
            alert("Completa todos los campos.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (!adult) {
            alert("Debes confirmar que eres mayor de edad.");
            return;
        }

        let usuarios = obtenerUsuarios();

        const existe = usuarios.find(
            usuario =>
                usuario.documentNumber === documentNumber ||
                usuario.email === email
        );

        if (existe) {
            alert("Ya existe una cuenta con ese documento o email.");
            return;
        }

        const usuario = {
            documentType,
            documentNumber,
            email,
            username,
            password,
            puntos: 0,
            juegosJugados: 0,
            estudiantesAyudados: 0,
            nivel: 1,
            misionesCompletadas: 0,
            logrosDesbloqueados: 0
        };

        usuarios.push(usuario);
        guardarUsuarios(usuarios);

        // login automático correcto
        guardarUsuarioActual(usuario);

        alert("Registro exitoso ✔");

        window.location.href = "play.html";
    });

});