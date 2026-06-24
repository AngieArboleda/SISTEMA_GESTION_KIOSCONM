import {
    obtener,
    guardar
}
from "../../core/storage.js";

const CLAVE = "productos";

export function obtenerProductos() {

    return obtener(CLAVE);

}

export function guardarProductos(productos) {

    guardar(
        CLAVE,
        productos
    );

}

export function agregarProducto(producto) {

    const productos =
        obtenerProductos();

    productos.push(producto);

    guardarProductos(
        productos
    );

}

export function buscarProductoPorCodigo(codigo) {

    return obtenerProductos()
        .find(
            producto =>
                producto.codigoBarras === codigo
        );

}

export function actualizarProducto(productoActualizado) {

    const productos =
        obtenerProductos();

    const indice =
        productos.findIndex(
            producto =>
                producto.codigoBarras ===
                productoActualizado.codigoBarras
        );

    if (indice !== -1) {

        productos[indice] =
            productoActualizado;

        guardarProductos(
            productos
        );

    }

}

export function cambiarEstadoProducto(
    codigoBarras
) {

    const productos =
        obtenerProductos();

    const producto =
        productos.find(
            p =>
                p.codigoBarras === codigoBarras
        );

    if (producto) {

        producto.estado =
            producto.estado === "Activo"
                ? "Inactivo"
                : "Activo";

        guardarProductos(
            productos
        );

    }

}