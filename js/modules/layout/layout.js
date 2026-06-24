import {
    obtenerSesion,
    cerrarSesion
}
from "../../core/session.js";

import {
    cargarVista
}
from "../../core/router.js";

export function configurarLayout(){

    const usuario =
        obtenerSesion();

    if(!usuario){

        cargarVista(
            "./views/login.html"
        );

        return;

    }

    const esAdministrador =

        usuario.rol ===
        "Administrador";

    document.getElementById(
        "usuarioActivo"
    ).textContent =

        usuario.nombre +

        " " +

        usuario.apellido;

    configurarAcceso(

        "btnDashboard",

        true,

        "./views/dashboard.html"

    );

    configurarAcceso(

        "btnUsuarios",

        esAdministrador ||

        usuario.permisos?.crearUsuario ||

        usuario.permisos?.editarUsuario ||

        usuario.permisos?.desactivarUsuario,

        "./views/usuarios.html"

    );

    configurarAcceso(

        "btnProductos",

        esAdministrador ||

        usuario.permisos?.crearProducto ||

        usuario.permisos?.editarProducto ||

        usuario.permisos?.desactivarProducto,

        "./views/productos.html"

    );

    configurarAcceso(

        "btnVentas",

        esAdministrador ||

        usuario.permisos?.ventas,

        "./views/ventas.html"

    );

    configurarAcceso(

        "btnStock",

        esAdministrador ||

        usuario.permisos?.inventario,

        "./views/inventario.html"

    );

    configurarAcceso(

        "btnProveedores",

        esAdministrador ||

        usuario.permisos?.proveedores,

        "./views/proveedores.html"

    );

    configurarAcceso(

        "btnCaja",

        esAdministrador ||

        usuario.permisos?.caja,

        "./views/caja.html"

    );

    configurarAcceso(

        "btnReportes",

        esAdministrador ||

        usuario.permisos?.reportes,

        "./views/reportes.html"

    );

    document
    .getElementById(
        "btnCerrarSesion"
    )
    ?.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "movimientosCaja"
            );

            cerrarSesion();

            cargarVista(
                "./views/login.html"
            );

        }
    );

    cargarVista(
        "./views/dashboard.html"
    );

    function configurarAcceso(

        botonId,

        tienePermiso,

        vista

    ){

        const boton =

            document.getElementById(
                botonId
            );

        if(

            !boton

        ){

            return;

        }

        boton.replaceWith(
            boton.cloneNode(
                true
            )
        );

        const nuevoBoton =

            document.getElementById(
                botonId
            );

        nuevoBoton.addEventListener(

            "click",

            () => {

                if(

                    !tienePermiso

                ){

                    alert(
                        "No tiene permisos para acceder."
                    );

                    return;

                }

                cargarVista(
                    vista
                );

            }

        );

        if(

            !tienePermiso

        ){

            nuevoBoton.style.opacity =
                "0.6";

            nuevoBoton.title =
                "Sin permisos";

        }

    }

}