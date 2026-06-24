import {
    obtenerVentas
}
from "../../services/ventasService.js";

import {
    obtenerUsuarios
}
from "../usuarios/usuariosStorage.js";

export function configurarReportes(){

    cargarUsuarios();

    cargarResumen();

    document
        .getElementById(
            "btnGenerarReporte"
        )
        ?.addEventListener(
            "click",
            generarReporte
        );

    document
        .getElementById(
            "btnExportarPDF"
        )
        ?.addEventListener(
            "click",
            () => {

                alert(
                    "Exportación PDF disponible próximamente"
                );

            }
        );

    document
        .getElementById(
            "btnExportarExcel"
        )
        ?.addEventListener(
            "click",
            () => {

                alert(
                    "Exportación Excel disponible próximamente"
                );

            }
        );

}

/* ===========================
    USUARIOS FILTRO
=========================== */

function cargarUsuarios(){

    const select =

        document.getElementById(
            "usuarioReporte"
        );

    if(!select) return;

    obtenerUsuarios()
        .forEach(
            usuario => {

                const option =

                    document.createElement(
                        "option"
                    );

                option.value =
                    usuario.usuario;

                option.textContent =

                    `${usuario.nombre} ${usuario.apellido}`;

                select.appendChild(
                    option
                );

            }
        );

}

/* ===========================
    RESUMEN
=========================== */

function cargarResumen(){

    const ventas =
        obtenerVentas();

    let totalVentas = 0;

    let cantidadVentas =
        ventas.length;

    let productosVendidos = 0;

    ventas.forEach(
        venta => {

            totalVentas +=
                Number(
                    venta.total || 0
                );

            venta.productos?.forEach(
                producto => {

                    productosVendidos +=
                        Number(
                            producto.cantidad || 0
                        );

                }
            );

        }
    );

    document.getElementById(
        "totalVentas"
    ).textContent =

        `$${totalVentas.toFixed(2)}`;

    document.getElementById(
        "cantidadVentas"
    ).textContent =

        cantidadVentas;

    document.getElementById(
        "productosVendidos"
    ).textContent =

        productosVendidos;

    document.getElementById(
        "rentabilidadTotal"
    ).textContent =

        `$${totalVentas.toFixed(2)}`;

}

/* ===========================
    GENERAR REPORTE
=========================== */

function generarReporte(){

    const tabla =

        document.getElementById(
            "tablaReportes"
        );

    tabla.innerHTML = "";

    let ventas =
        obtenerVentas();

    const fechaDesde =

        document.getElementById(
            "fechaDesde"
        ).value;

    const fechaHasta =

        document.getElementById(
            "fechaHasta"
        ).value;

    if(fechaDesde){

        ventas =
            ventas.filter(
                venta =>

                    venta.fecha
                        .substring(0,10)

                    >=

                    fechaDesde
            );

    }

    if(fechaHasta){

        ventas =
            ventas.filter(
                venta =>

                    venta.fecha
                        .substring(0,10)

                    <=

                    fechaHasta
            );

    }

    ventas.forEach(
        (
            venta,
            index
        ) => {

            const fila =

                document.createElement(
                    "tr"
                );

            fila.innerHTML = `

                <td>

                    ${new Date(
                        venta.fecha
                    ).toLocaleDateString(
                        "es-AR"
                    )}

                </td>

                <td>

                    ${index + 1}

                </td>

                <td>

                    Sistema

                </td>

                <td>

                    Principal

                </td>

                <td>

                    -

                </td>

                <td>

                    Consumidor Final

                </td>

                <td>

                    ${venta.metodoPago}

                </td>

                <td>

                    $${Number(
                        venta.total
                    ).toFixed(2)}

                </td>

                <td>

                    Completada

                </td>

            `;

            tabla.appendChild(
                fila
            );

        }
    );

}