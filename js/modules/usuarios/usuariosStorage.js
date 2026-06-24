import {
    guardar,
    obtener
}
from "../../core/storage.js";

const CLAVE =
    "usuarios";

export function obtenerUsuarios() {

    return obtener(
        CLAVE
    );

}

export function guardarUsuarios(
    usuarios
) {

    guardar(
        CLAVE,
        usuarios
    );

}