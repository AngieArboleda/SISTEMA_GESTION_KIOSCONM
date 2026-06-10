import {
    cerrarSesion,
    obtenerSesion
}
from "../../core/session.js";

import { permisos }
from "../../core/permissions.js";

import { cargarVista }
from "../../core/router.js";

export function configurarMenu() {
    const usuario = obtenerSesion();
    const permisosUsuario =
    permisos[usuario.rol];
    const modulos = [
    "usuarios",
    "productos",
    "ventas",
    "stock",
    "proveedores",
    "caja",
    "reportes"
];

modulos.forEach(modulo => {

    if(
        !permisosUsuario.includes(modulo)
    ){

        document.getElementById(
            modulo
        ).disabled = true;

    }

});
document
    .getElementById("usuarios")
    ?.addEventListener(
        "click",
        () => {

            cargarVista(
                "./views/usuarios.html"
            );

        }
    );
    
    document
    .getElementById("productos")
    ?.addEventListener(
        "click",
        () => {

            cargarVista(
                "./views/productos.html"
            );

        }
    );

document.getElementById(
    "nombreUsuario"
).textContent =
    usuario.nombre +
    " " +
    usuario.apellido;

document.getElementById(
    "rolUsuario"
).textContent =
    usuario.rol;

    const botonCerrar =
        document.getElementById(
            "btnCerrarSesion"
        );

    botonCerrar.addEventListener(
        "click",
        () => {

            cerrarSesion();

            cargarVista(
                "./views/login.html"
            );

        }
    );

}