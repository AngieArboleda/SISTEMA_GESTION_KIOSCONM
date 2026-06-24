export async function cargarVista(ruta) {

    try {

        const respuesta =
            await fetch(ruta);

        if (!respuesta.ok) {

            throw new Error(
                `No se pudo cargar la vista: ${ruta}`
            );

        }

        const html =
            await respuesta.text();

        const contenedor =

            document.getElementById(
                "contenido"
            )

            ||

            document.getElementById(
                "app"
            );

        contenedor.innerHTML =
            html;

        /* LOGIN */

        if (
            ruta.includes(
                "login.html"
            )
        ) {

            const modulo =
                await import(
                    "../modules/auth/login.js"
                );

            modulo.configurarLogin();

        }

        /* LAYOUT */

        if (
            ruta.includes(
                "layout.html"
            )
        ) {

            const modulo =
                await import(
                    "../modules/layout/layout.js"
                );

            modulo.configurarLayout();

        }

        /* DASHBOARD */

        if (
            ruta.includes(
                "dashboard.html"
            )
        ) {

            const modulo =
                await import(
                    "../modules/dashboard/dashboard.js"
                );

            modulo.configurarDashboard();

        }

        /* USUARIOS */

        if (
            ruta.includes(
                "usuarios.html"
            )
        ) {

            const modulo =
                await import(
                    "../modules/usuarios/usuarios.js"
                );

            modulo.configurarUsuarios();

        }

        /* PRODUCTOS */

        if (
            ruta.includes(
                "productos.html"
            )
        ) {

            const modulo =
                await import(
                    "../modules/productos/productos.js"
                );

            modulo.configurarProductos();

        }

        /* VENTAS */

        if (
            ruta.includes(
                "ventas.html"
            )
        ) {

            const modulo =
                await import(
                    "../modules/ventas/ventas.js"
                );

            modulo.configurarVentas();

        }

        /* INVENTARIO */

        if (
            ruta.includes(
                "inventario.html"
            )
        ) {

            const modulo =
                await import(
                    "../modules/inventario/inventario.js"
                );

            modulo.configurarInventario();

        }

        /* CAJA */

        if (
            ruta.includes(
                "caja.html"
            )
        ) {

            const modulo =
                await import(
                    "../modules/caja/caja.js"
                );

            modulo.configurarCaja();

        }

        /* REPORTES */

        if (
            ruta.includes(
                "reportes.html"
            )
        ) {

            const modulo =
                await import(
                    "../modules/reportes/reportes.js"
                );

            modulo.configurarReportes();

        }

        /* PROVEEDORES */

        if (
            ruta.includes(
                "proveedores.html"
            )
        ) {

            const modulo =
                await import(
                    "../modules/proveedores/proveedores.js"
                );

            modulo.configurarProveedores();

        }

    } catch (error) {

        console.error(
            "Error cargando vista:",
            error
        );

    }

}