import { iniciarSesion }
from "../../core/session.js";

import {
    obtenerUsuarios
}
from "../../services/usuariosService.js";

import { cargarVista }
from "../../core/router.js";

export async function configurarLogin() {

    const formulario =
        document.getElementById("loginForm");

    formulario.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const usuario =
                document.getElementById("usuario").value;

            const password =
                document.getElementById("password").value;
                
                const usuarios =
    obtenerUsuarios();

            const encontrado =
                usuarios.find(
                    u =>
                    u.usuario === usuario &&
                    u.password === password &&
                    u.estado === "Activo"
                );

            if(!encontrado){

                alert(
                    "Usuario o contraseña incorrectos"
                );

                return;
            }

        iniciarSesion(encontrado);

cargarVista(
    "./views/menu.html"
);

        }
    );
}