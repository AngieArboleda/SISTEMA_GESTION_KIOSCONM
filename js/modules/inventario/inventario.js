import {
    obtenerProductos
}
from "../../services/productosService.js";

export function configurarInventario(){

    cargarInventario();
    document
    .getElementById(
        "btnBuscarInventario"
    )
    ?.addEventListener(
        "click",
        filtrarInventario
    );

document
    .getElementById(
        "btnLimpiarInventario"
    )
    ?.addEventListener(
        "click",
        limpiarInventario
    );

    document
        .getElementById(
            "btnActualizarStock"
        )
        ?.addEventListener(
            "click",
            cargarInventario
        );

        document
    .getElementById(
        "btnExportarInventario"
    )
    ?.addEventListener(
        "click",
        exportarInventario
    );

    document
        .getElementById(
            "buscarInventario"
        )
        ?.addEventListener(
            "input",
            filtrarInventario
        );

    document
        .getElementById(
            "filtroCategoria"
        )
        ?.addEventListener(
            "change",
            filtrarInventario
        );

    document
        .getElementById(
            "filtroProveedor"
        )
        ?.addEventListener(
            "change",
            filtrarInventario
        );

    document
        .getElementById(
            "filtroEstado"
        )
        ?.addEventListener(
            "change",
            filtrarInventario
        );

}

function exportarInventario(){

    const productos =
        obtenerProductos();

    if(
        productos.length === 0
    ){

        alert(
            "No hay productos para exportar"
        );

        return;

    }

    let csv =

        "Codigo,Producto,Categoria,Proveedor,Costo Unitario,Precio Venta,Stock,Stock Minimo\n";

    productos.forEach(
        producto => {

            csv +=

                `"${producto.codigoBarras}",` +

                `"${producto.nombreProducto}",` +

                `"${producto.categoria}",` +

                `"${producto.proveedor}",` +

                `"${producto.costoUnitario}",` +

                `"${producto.precio}",` +

                `"${producto.stock}",` +

                `"${producto.stockMinimo}"\n`;

        }
    );

    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const enlace =
        document.createElement(
            "a"
        );

    enlace.href =
        url;

    enlace.download =
        "inventario.csv";

    enlace.click();

    URL.revokeObjectURL(
        url
    );

}

function limpiarInventario(){

    document.getElementById(
        "buscarInventario"
    ).value = "";

    document.getElementById(
        "filtroCategoria"
    ).value = "";

    document.getElementById(
        "filtroProveedor"
    ).value = "";

    document.getElementById(
        "filtroEstado"
    ).value = "";

    cargarInventario();

}

function cargarInventario(){

    const productos =
        obtenerProductos();

    cargarFiltros(
        productos
    );

    renderizarTabla(
        productos
    );

    actualizarResumen(
        productos
    );

}

function cargarFiltros(
    productos
){

    const categorias =

        [
            ...new Set(
                productos.map(
                    p => p.categoria
                )
            )
        ];

    const proveedores =

        [
            ...new Set(
                productos.map(
                    p => p.proveedor
                )
            )
        ];

    const filtroCategoria =
        document.getElementById(
            "filtroCategoria"
        );

    const filtroProveedor =
        document.getElementById(
            "filtroProveedor"
        );

    filtroCategoria.innerHTML =

        `
        <option value="">
            Todas las categorías
        </option>
        `;

    filtroProveedor.innerHTML =

        `
        <option value="">
            Todos los proveedores
        </option>
        `;

    categorias.forEach(
        categoria => {

            filtroCategoria.innerHTML +=
            `
            <option value="${categoria}">
                ${categoria}
            </option>
            `;

        }
    );

    proveedores.forEach(
        proveedor => {

            filtroProveedor.innerHTML +=
            `
            <option value="${proveedor}">
                ${proveedor}
            </option>
            `;

        }
    );

}

function renderizarTabla(
    productos
){

    const tabla =

        document.getElementById(
            "tablaInventario"
        );

    tabla.innerHTML = "";

    productos.forEach(
        producto => {

            const costo =

                Number(
                    producto.costoUnitario
                );

            const precio =

                Number(
                    producto.precio
                );

            const ganancia =
                precio - costo;

            const margen =

                costo > 0

                ?

                (
                    ganancia /
                    costo
                ) * 100

                :

                0;

            let estado =
                "Normal";

            if(
                Number(
                    producto.stock
                ) === 0
            ){

                estado =
                    "Sin Stock";

            }
            else if(

                Number(
                    producto.stock
                )

                <=

                Number(
                    producto.stockMinimo
                )

            ){

                estado =
                    "Stock Mínimo";

            }

            tabla.innerHTML +=
            `
            <tr>

                <td
    class="texto-recortado"
    title="${producto.codigoBarras}"
>
                    ${producto.codigoBarras}
                </td>

                <td
    class="texto-recortado"
    title="${producto.nombreProducto}"
>
                    ${producto.nombreProducto}
                </td>

                <td
    class="texto-recortado"
    title="${producto.categoria}"
>
    ${producto.categoria}
</td>

                <td
    class="texto-recortado"
    title="${producto.proveedor}"
>
                    ${producto.proveedor}
                </td>

                <td>
                    $${costo.toFixed(2)}
                </td>

                <td>
                    $${precio.toFixed(2)}
                </td>

                <td>
                    ${margen.toFixed(2)}%
                </td>

                <td>
                    $${ganancia.toFixed(2)}
                </td>

                <td>
                    ${producto.stock}
                </td>

                <td>
                    ${producto.stockMinimo}
                </td>

                <td>
                    ${estado}
                </td>

            </tr>
            `;

        }
    );

}

function actualizarResumen(
    productos
){

    document.getElementById(
        "totalProductosInventario"
    ).textContent =
        productos.length;

    document.getElementById(
        "productosMinimos"
    ).textContent =

        productos.filter(
            producto =>

                Number(
                    producto.stock
                )

                <=

                Number(
                    producto.stockMinimo
                )

                &&

                Number(
                    producto.stock
                ) > 0
        ).length;

    document.getElementById(
        "productosAgotados"
    ).textContent =

        productos.filter(
            producto =>

                Number(
                    producto.stock
                ) === 0
        ).length;

    const valorInventario =

        productos.reduce(
            (
                total,
                producto
            ) =>

                total +

                (
                    Number(
                        producto.stock
                    )

                    *

                    Number(
                        producto.costoUnitario
                    )
                ),

            0
        );

    document.getElementById(
        "valorInventario"
    ).textContent =

        "$" +

        valorInventario.toFixed(
            2
        );

}

function filtrarInventario(){

    const texto =

        document
            .getElementById(
                "buscarInventario"
            )
            .value
            .toLowerCase();

    const categoria =

        document
            .getElementById(
                "filtroCategoria"
            )
            .value;

    const proveedor =

        document
            .getElementById(
                "filtroProveedor"
            )
            .value;

    const estado =

        document
            .getElementById(
                "filtroEstado"
            )
            .value;

    let productos =
        obtenerProductos();

    productos =
        productos.filter(
            producto => {

                let estadoActual =
                    "normal";

                if(
                    Number(
                        producto.stock
                    ) === 0
                ){

                    estadoActual =
                        "agotado";

                }
                else if(

                    Number(
                        producto.stock
                    )

                    <=

                    Number(
                        producto.stockMinimo
                    )

                ){

                    estadoActual =
                        "minimo";

                }

                return (

                    (
                        producto.nombreProducto
                        .toLowerCase()
                        .includes(
                            texto
                        )

                        ||

                        producto.codigoBarras
                        .toLowerCase()
                        .includes(
                            texto
                        )
                    )

                    &&

                    (
                        categoria === ""
                        ||
                        producto.categoria ===
                        categoria
                    )

                    &&

                    (
                        proveedor === ""
                        ||
                        producto.proveedor ===
                        proveedor
                    )

                    &&

                    (
                        estado === ""
                        ||
                        estadoActual ===
                        estado
                    )

                );

            }
        );

    renderizarTabla(
        productos
    );

}