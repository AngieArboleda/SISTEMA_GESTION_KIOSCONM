export function iniciarSesion(usuario) {
    localStorage.setItem(
        "sesionActiva",
        JSON.stringify(usuario)
    );
}

export function obtenerSesion() {
    const sesion = localStorage.getItem("sesionActiva");

    return sesion ? JSON.parse(sesion) : null;
}

export function cerrarSesion() {
    localStorage.removeItem("sesionActiva");
}