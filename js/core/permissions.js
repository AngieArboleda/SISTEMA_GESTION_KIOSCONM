export const permisosAcciones = {

    Administrador: {

        crearUsuario: true,
        editarUsuario: true,
        desactivarUsuario: true,

        crearProducto: true,
        editarProducto: true,
        desactivarProducto: true,

        ventas: true,
        caja: true,
        reportes: true

    },

    Vendedor: {

        crearUsuario: false,
        editarUsuario: false,
        desactivarUsuario: false,

        crearProducto: false,
        editarProducto: false,
        desactivarProducto: false,

        ventas: true,
        caja: false,
        reportes: false

    }

};