console.log(
    "MODULO PRODUCTOS CARGADO"
);
import {

    obtenerProductos,
    guardarProductos

}
from "../../services/productosService.js";

let productoEditando = null;

export function configurarProductos() {

    console.log(
        "FUNCION PRODUCTOS EJECUTADA"
    );

    cargarProductos();

    const formulario =

        document.getElementById(
            "formProducto"
        );

    formulario.addEventListener(
        "submit",
        guardarNuevoProducto
    );

function cargarProductos() {

    const productos =
        obtenerProductos();

    const tbody =

        document.querySelector(
            "#tablaProductos tbody"
        );

    tbody.innerHTML = "";

    productos.forEach(
        producto => {

            tbody.innerHTML += `

                <tr>

                    <td>
                        ${producto.codigoBarras}
                    </td>

                    <td>
                        ${producto.nombreProducto}
                    </td>

                    <td>
                        ${producto.categoria}
                    </td>

                    <td>
                        ${producto.precio}
                    </td>

                    <td>
                        ${producto.stock}
                    </td>

                    <td>
                        ${producto.stockMinimo}
                    </td>

                    <td>

                    <button
                    class="btnEditarProducto"
                    data-codigo="${producto.codigoBarras}"
                    >

                    Editar

                    </button>

                    </td>

                </tr>

            `;

        }
    );
    configurarBotonesEditarProducto();

}

function configurarBotonesEditarProducto() {

    const botones =

        document.querySelectorAll(
            ".btnEditarProducto"
        );

    botones.forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    editarProducto(
                        boton.dataset.codigo
                    );

                }
            );

        }
    );

}

function editarProducto(
    codigoBuscado
) {

    const productos =
        obtenerProductos();

    const producto =
        productos.find(
            p =>
            p.codigoBarras ===
            codigoBuscado
        );

    if (!producto) return;

    document.getElementById(
        "codigoBarras"
    ).value =
        producto.codigoBarras;

    document.getElementById(
        "nombreProducto"
    ).value =
        producto.nombreProducto;

    document.getElementById(
        "categoria"
    ).value =
        producto.categoria;

    document.getElementById(
        "precio"
    ).value =
        producto.precio;

    document.getElementById(
        "stock"
    ).value =
        producto.stock;

    document.getElementById(
        "stockMinimo"
    ).value =
        producto.stockMinimo;

    productoEditando =
        producto.codigoBarras;

}

function guardarNuevoProducto(e) {

    e.preventDefault();

    const codigoBarras =
        document.getElementById(
            "codigoBarras"
        ).value;

    const nombreProducto =
        document.getElementById(
            "nombreProducto"
        ).value;

    const categoria =
        document.getElementById(
            "categoria"
        ).value;

    const precio =
        document.getElementById(
            "precio"
        ).value;

    const stock =
        document.getElementById(
            "stock"
        ).value;

    const stockMinimo =
        document.getElementById(
            "stockMinimo"
        ).value;
        if (

    codigoBarras.trim() === "" ||

    nombreProducto.trim() === "" ||

    precio.trim() === "" ||

    stock.trim() === "" ||

    stockMinimo.trim() === ""

) {

    alert(
        "Todos los campos son obligatorios"
    );

    return;

}

    console.log({

        codigoBarras,
        nombreProducto,
        categoria,
        precio,
        stock,
        stockMinimo

    });
    const productos =
    obtenerProductos();
    const existeProducto =

    productos.some(
        producto =>

            producto.codigoBarras ===
            codigoBarras
    );

    if (productoEditando) {

    const productoExistente =

        productos.find(
            p =>
            p.codigoBarras ===
            productoEditando
        );

    productoExistente.codigoBarras =
        codigoBarras;

    productoExistente.nombreProducto =
        nombreProducto;

    productoExistente.categoria =
        categoria;

    productoExistente.precio =
        precio;

    productoExistente.stock =
        stock;

    productoExistente.stockMinimo =
        stockMinimo;

    guardarProductos(
        productos
    );

    productoEditando =
        null;

    cargarProductos();

    document.getElementById(
        "formProducto"
    ).reset();

    return;

}

if (existeProducto) {

    alert(
        "El código ya existe"
    );

    return;

}

productos.push({

    codigoBarras,
    nombreProducto,
    categoria,
    precio,
    stock,
    stockMinimo

});

guardarProductos(
    productos
);

cargarProductos();

document.getElementById(
    "formProducto"
).reset();

console.log(
    "PRODUCTO GUARDADO"
);

}
}

