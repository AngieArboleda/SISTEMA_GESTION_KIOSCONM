export function guardar(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

export function obtener(clave) {
    const datos = localStorage.getItem(clave);

    return datos ? JSON.parse(datos) : [];
}

export function eliminar(clave) {
    localStorage.removeItem(clave);
}