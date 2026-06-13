const CLAVE_PRODUCTOS =
    "productos";

export function obtenerProductos() {

    return JSON.parse(
        localStorage.getItem(
            CLAVE_PRODUCTOS
        )
    ) || [];

}

export function guardarProductos(
    productos
) {

    localStorage.setItem(
        CLAVE_PRODUCTOS,
        JSON.stringify(
            productos
        )
    );

}