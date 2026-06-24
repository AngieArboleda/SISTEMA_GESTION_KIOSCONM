import {
    obtenerVentas
}
from "../../services/ventasService.js";

import {
    obtenerSesion
}
from "../../core/session.js";

import {
    obtenerProveedores
}
from "../proveedores/proveedoresStorage.js";

const CLAVE_CAJA =
    "movimientosCaja";

/* ===========================
    CONFIGURACIÓN INICIAL
=========================== */

export function configurarCaja() {

    cargarProveedores();

    cargarResumenCaja();

    cargarMovimientos();

    configurarEventos();

}

/* ===========================
    EVENTOS
=========================== */

function configurarEventos() {

    document
        .getElementById(
            "btnRegistrarMovimiento"
        )
        ?.addEventListener(
            "click",
            registrarMovimiento
        );

    document
        .getElementById(
            "btnCerrarCaja"
        )
        ?.addEventListener(
            "click",
            cerrarCaja
        );

}

/* ===========================
    PROVEEDORES
=========================== */

function cargarProveedores() {

    const select =

        document.getElementById(
            "proveedorMovimiento"
        );

    if (!select) return;

    select.innerHTML =

        `<option value="">
            Proveedor
        </option>`;

    const proveedores =

        obtenerProveedores();

    proveedores
        .filter(
            p =>
                p.estado ===
                "Activo"
        )
        .forEach(
            proveedor => {

                select.innerHTML += `

                    <option
                        value="${proveedor.nombre}"
                    >

                        ${proveedor.nombre}

                    </option>

                `;

            }
        );

}

/* ===========================
    RESUMEN CAJA
=========================== */

function cargarResumenCaja() {

    const ventas =
        obtenerVentas();

    const movimientos =
        obtenerMovimientos();

    let efectivo = 0;

    let tarjeta = 0;

    let mp = 0;

    let mixto = 0;

    ventas.forEach(
        venta => {

            switch (
                venta.metodoPago
            ) {

                case "Efectivo":

                    efectivo +=
                        venta.total;

                    break;

                case "Tarjeta":

                    tarjeta +=
                        venta.total;

                    break;

                case "MercadoPago":

                    mp +=
                        venta.total;

                    break;

                case "Mixto":

                    mixto +=
                        venta.total;

                    break;

            }

        }
    );

    let ingresos = 0;

    let egresos = 0;

    movimientos.forEach(
        movimiento => {

            if (

                movimiento.tipo ===
                "ingreso"

            ) {

                ingresos +=
                    movimiento.monto;

            }

            else {

                egresos +=
                    movimiento.monto;

            }

        }
    );

    const totalVentas =

        efectivo
        + tarjeta
        + mp
        + mixto;

    const saldoActual =

        totalVentas
        + ingresos
        - egresos;

    document.getElementById(
        "saldoInicial"
    ).textContent =
        "$0";

    document.getElementById(
        "totalIngresos"
    ).textContent =
        `$${ingresos.toFixed(2)}`;

    document.getElementById(
        "totalEgresos"
    ).textContent =
        `$${egresos.toFixed(2)}`;

    document.getElementById(
        "saldoActual"
    ).textContent =
        `$${saldoActual.toFixed(2)}`;

    document.getElementById(
        "saldoEsperado"
    ).value =
        saldoActual.toFixed(2);

    document.getElementById(
        "totalEfectivo"
    ).textContent =
        `$${efectivo.toFixed(2)}`;

    document.getElementById(
        "totalTarjeta"
    ).textContent =
        `$${tarjeta.toFixed(2)}`;

    document.getElementById(
        "totalMP"
    ).textContent =
        `$${mp.toFixed(2)}`;

    document.getElementById(
        "totalMixto"
    ).textContent =
        `$${mixto.toFixed(2)}`;

}

/* ===========================
    MOVIMIENTOS
=========================== */

function obtenerMovimientos() {

    return JSON.parse(

        localStorage.getItem(
            CLAVE_CAJA
        )

    ) || [];

}

function guardarMovimientos(
    movimientos
) {

    localStorage.setItem(

        CLAVE_CAJA,

        JSON.stringify(
            movimientos
        )

    );

}

function registrarMovimiento() {

    const tipo =

        document.getElementById(
            "tipoMovimiento"
        ).value;

    const motivo =

        document.getElementById(
            "motivoMovimiento"
        ).value;

    const proveedor =

        document.getElementById(
            "proveedorMovimiento"
        ).value;

    const monto = Number(

        document.getElementById(
            "montoMovimiento"
        ).value

    );

    const descripcion =

        document.getElementById(
            "descripcionMovimiento"
        ).value;

    if (

        !tipo ||
        !motivo ||
        monto <= 0

    ) {

        alert(
            "Complete los datos."
        );

        return;

    }

    const sesion =
        obtenerSesion();

    const movimientos =
        obtenerMovimientos();

    movimientos.push({

        hora:
            new Date()
            .toLocaleTimeString(
                "es-AR"
            ),

        tipo,

        motivo,

        proveedor,

        monto,

        descripcion,

        usuario:

            sesion?.usuario
            ||

            "Sistema"

    });

    guardarMovimientos(
        movimientos
    );

    cargarMovimientos();

    cargarResumenCaja();

}

/* ===========================
    TABLA MOVIMIENTOS
=========================== */

function cargarMovimientos() {

    const tabla =

        document.getElementById(
            "tablaMovimientosCaja"
        );

    if (!tabla) return;

    tabla.innerHTML = "";

    obtenerMovimientos()
        .forEach(
            movimiento => {

                tabla.innerHTML += `

                    <tr>

                        <td>${movimiento.hora}</td>

                        <td>${movimiento.tipo}</td>

                        <td>${movimiento.motivo}</td>

                        <td>${movimiento.proveedor}</td>

                        <td>$${movimiento.monto}</td>

                        <td>${movimiento.usuario}</td>

                    </tr>

                `;

            }
        );

}

/* ===========================
    CIERRE CAJA
=========================== */

function cerrarCaja() {

    const esperado = Number(

        document.getElementById(
            "saldoEsperado"
        ).value

    );

    const contado = Number(

        document.getElementById(
            "dineroContado"
        ).value

    );

    const diferencia =

        contado - esperado;

    document.getElementById(
        "diferenciaCaja"
    ).value =

        diferencia.toFixed(2);

    const estadoCaja =

        document.getElementById(
            "estadoCaja"
        );

    estadoCaja.textContent =
        "🔴 Caja Cerrada";

    estadoCaja.className =
        "estado-caja-cerrada";

    document.getElementById(
        "btnRegistrarMovimiento"
    ).disabled = true;

    document.getElementById(
        "tipoMovimiento"
    ).disabled = true;

    document.getElementById(
        "motivoMovimiento"
    ).disabled = true;

    document.getElementById(
        "proveedorMovimiento"
    ).disabled = true;

    document.getElementById(
        "montoMovimiento"
    ).disabled = true;

    document.getElementById(
        "descripcionMovimiento"
    ).disabled = true;

    document.getElementById(
        "btnCerrarCaja"
    ).disabled = true;

    alert(

        `Caja cerrada correctamente\n\nDiferencia: $${diferencia.toFixed(2)}`

    );

}