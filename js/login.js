document.addEventListener("DOMContentLoaded", () => {

    if (estaLogueado()) {
        window.location.href = "play.html";
        return;
    }

    const form = document.querySelector(".login-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const tipoDocumento =
            document.getElementById("document-type").value.trim();

        const numeroDocumento =
            document.getElementById("document-number").value.trim();

        const password =
            document.getElementById("password").value.trim();

        const usuarios = obtenerUsuarios();

        if (!usuarios.length) {            
            alert("No hay usuarios registrados");
            return;
        }

        const usuario = usuarios.find(u =>
            u.documentType === tipoDocumento &&
            u.documentNumber === numeroDocumento &&
            u.password === password
        );

        if (!usuario && usuarios.length <=1) {            
            alert("No hay usuarios registrados");
            return;
        }

        if (!usuario) {
            alert("Documento o contraseña incorrectos");
            return;
        }

        guardarUsuarioActual(usuario);

        alert("Inicio de sesión exitoso ✔");

        if(usuario.role){
            window.location.href = "admin.html";
        }else{
            window.location.href = "play.html";
        }
        
    });

});