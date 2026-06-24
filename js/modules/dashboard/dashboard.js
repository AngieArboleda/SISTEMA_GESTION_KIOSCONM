import {
    obtenerUsuarios
}
from "../usuarios/usuariosStorage.js";

import {
    obtenerProductos
}
from "../productos/productosStorage.js";

export function configurarDashboard() {

    const usuarios =
        obtenerUsuarios();

    const productos =
        obtenerProductos();

    document.getElementById(
        "totalUsuarios"
    ).textContent =
        usuarios.length;

    document.getElementById(
        "totalProductos"
    ).textContent =
        productos.length;

    const fecha =
        new Date();

    const fechaActual =
        fecha.toLocaleDateString();

    const horaActual =
        fecha.toLocaleTimeString();

    console.log(
        fechaActual,
        horaActual
    );

}