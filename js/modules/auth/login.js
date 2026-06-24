import {
    iniciarSesion
}
from "../../core/session.js";

import {
    obtenerUsuarios
}
from "../../services/usuariosService.js";

import {
    cargarVista
}
from "../../core/router.js";

export async function configurarLogin() {

    const formulario =
        document.getElementById(
            "loginForm"
        );

    const campoPassword =
        document.getElementById(
            "password"
        );

    const togglePassword =
        document.getElementById(
            "togglePassword"
        );

    if (
        campoPassword &&
        togglePassword
    ) {

        togglePassword.addEventListener(
            "mousedown",
            () => {

                campoPassword.type =
                    "text";

            }
        );

        togglePassword.addEventListener(
            "mouseup",
            () => {

                campoPassword.type =
                    "password";

            }
        );

        togglePassword.addEventListener(
            "mouseleave",
            () => {

                campoPassword.type =
                    "password";

            }
        );

    }

    formulario?.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();

            const usuario =
                document
                    .getElementById(
                        "usuario"
                    )
                    .value
                    .trim();

            const password =
                document
                    .getElementById(
                        "password"
                    )
                    .value;

            const usuarios =
                obtenerUsuarios();

            const encontrado =
                usuarios.find(
                    u =>

                        u.usuario ===
                        usuario

                        &&

                        u.password ===
                        password

                        &&

                        u.estado ===
                        "Activo"
                );

            if (
                !encontrado
            ) {

                alert(
                    "Usuario o contraseña incorrectos"
                );

                return;

            }

            iniciarSesion(
                encontrado
            );

            cargarVista(
                "./views/layout.html"
            );

        }
    );

}