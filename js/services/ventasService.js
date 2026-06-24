import {
    obtener,
    guardar
}
from "../core/storage.js";

const CLAVE = "ventas";

export function obtenerVentas() {

    return obtener(CLAVE);

}

export function guardarVentas(ventas) {

    guardar(
        CLAVE,
        ventas
    );

}

export function agregarVenta(venta) {

    const ventas =
        obtenerVentas();

    ventas.push(venta);

    guardarVentas(
        ventas
    );

}