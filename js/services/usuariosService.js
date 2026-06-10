const CLAVE_USUARIOS =
    "usuarios";

export function obtenerUsuarios() {

    return JSON.parse(
        localStorage.getItem(
            CLAVE_USUARIOS
        )
    ) || [];

}

export function guardarUsuarios(
    usuarios
){

    localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify(
            usuarios
        )
    );

}