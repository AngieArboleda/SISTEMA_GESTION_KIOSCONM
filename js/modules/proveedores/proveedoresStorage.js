import {
    guardar,
    obtener
}
from "../../core/storage.js";

const CLAVE =
    "proveedores";

export function obtenerProveedores(){

    return obtener(
        CLAVE
    ) || [];

}

export function guardarProveedores(
    proveedores
){

    guardar(
        CLAVE,
        proveedores
    );

}