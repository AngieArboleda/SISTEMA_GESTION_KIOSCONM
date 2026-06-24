import {
    obtenerSesion
}
from "../../core/session.js";

import {
    obtenerProductos,
    guardarProductos
}
from "../../services/productosService.js";

import {
    obtenerVentas,
    agregarVenta
}
from "../../services/ventasService.js";

let productos = [];

let ventaActual = [];

let ventaActiva = true;

/* ===========================
    VENTAS SIMULTÁNEAS
=========================== */

let ventasAbiertas = {

    1: []

};

let ventaSeleccionada = 1;

/* ===========================
    CONFIGURACIÓN INICIAL
=========================== */

export function configurarVentas() {

    productos =
        obtenerProductos();
        console.log(               /*temporalmnete*/
    "PRODUCTOS CARGADOS:",
    productos
);
    cargarRolUsuario();

    actualizarFechaHora();

    setInterval(
        actualizarFechaHora,
        1000
    );

    configurarBusqueda();

    configurarMetodoPago();

    configurarBotones();

    actualizarResumen();

    renderizarPestanas();

    actualizarTituloVenta();

}
function cargarRolUsuario() {

    const rolVenta =
        document.getElementById(
            "rolVenta"
        );

    if (!rolVenta) return;

    const sesion =
        obtenerSesion();

    if (!sesion) return;

    rolVenta.textContent =
    sesion.perfil ||
    sesion.rol ||
    "Usuario";

}
/* ===========================
    FECHA Y HORA
=========================== */

function actualizarFechaHora() {

    const fechaVenta =
        document.getElementById(
            "fechaVenta"
        );

    const horaVenta =
        document.getElementById(
            "horaVenta"
        );

    if (
        !fechaVenta ||
        !horaVenta
    ) return;

    const ahora =
        new Date();

    fechaVenta.textContent =
        ahora.toLocaleDateString(
            "es-AR"
        );

    horaVenta.textContent =
        ahora.toLocaleTimeString(
            "es-AR"
        );

}
/* ===========================
    TITULO VENTA
=========================== */

function actualizarTituloVenta() {

    const titulo =

        document.getElementById(
            "tituloVenta"
        );

    if (!titulo) return;

    titulo.textContent =

        `🧾 Datos de la Venta - Venta ${ventaSeleccionada}`;

}
/* ===========================
    MÉTODO DE PAGO
=========================== */

function configurarMetodoPago() {

    const metodoPago =

        document.getElementById(
            "metodoPago"
        );

    const contenedorMixto =

        document.getElementById(
            "contenedorMetodoMixto"
        );

    metodoPago?.addEventListener(
        "change",
        () => {

            if (

                metodoPago.value ===
                "Mixto"

            ) {

                contenedorMixto.style.display =
                    "block";

            }

            else {

                contenedorMixto.style.display =
                    "none";

            }

        }
    );

}

/* ===========================
    BÚSQUEDA
=========================== */

function configurarBusqueda() {

    const inputBusqueda =

        document.getElementById(
            "buscarProducto"
        );

    const listaSugerencias =

        document.getElementById(
            "listaSugerencias"
        );

    const modalBusqueda =

        document.getElementById(
            "modalBusqueda"
        );

    const cerrarBusqueda =

        document.getElementById(
            "cerrarBusqueda"
        );

    cerrarBusqueda?.addEventListener(
        "click",
        () => {

            modalBusqueda.style.display =
                "none";

        }
    );

    inputBusqueda?.addEventListener(
        "input",
        () => {

            const texto =

                inputBusqueda.value
                    .trim()
                    .toLowerCase();

            listaSugerencias.innerHTML =
                "";

            if (

                texto.length < 1

            ) {

                modalBusqueda.style.display =
                    "none";

                return;

            }

            const encontrados =

                productos.filter(
                    producto =>

                        producto.estado ===
                        "Activo"

                        &&

                        (

                            producto.nombreProducto
                                .toLowerCase()
                                .includes(texto)

                            ||

                            producto.codigoBarras
                                .includes(texto)

                        )

                );

            if (

                encontrados.length === 0

            ) {

                modalBusqueda.style.display =
                    "none";

                return;

            }

            modalBusqueda.style.display =
                "flex";

            encontrados.forEach(
                producto => {

                    const fila =
                        document.createElement(
                            "tr"
                        );

                    fila.innerHTML = `

                        <td>

                            ${producto.codigoBarras}

                        </td>

                        <td>

                            ${producto.nombreProducto}

                        </td>

                        <td>

                            $${Number(
                                producto.precio
                            ).toFixed(2)}

                        </td>

                    `;

                    fila.addEventListener(
                        "click",
                        () => {

                            agregarProductoVenta(
                                producto
                            );

                            modalBusqueda.style.display =
                                "none";

                            inputBusqueda.value =
                                "";

                            listaSugerencias.innerHTML =
                                "";

                        }
                    );

                    listaSugerencias.appendChild(
                        fila
                    );

                }
            );

        }
    );

}
/* ===========================
    AGREGAR PRODUCTO
=========================== */

function agregarProductoVenta(
    producto
) {

    const existente =

        ventaActual.find(
            item =>

                item.codigoBarras ===
                producto.codigoBarras
        );

    if (existente) {

        existente.cantidad++;

    }

    else {

        ventaActual.push({

            codigoBarras:
                producto.codigoBarras,

            nombreProducto:
                producto.nombreProducto,

            costoUnitario:
                Number(
                    producto.costoUnitario
                ) || 0,

            precio:
                Number(
                    producto.precio
                ) || 0,

            cantidad: 1,

            iva: 0,

            descuento: 0

        });

    }

    ventasAbiertas[
    ventaSeleccionada
] = ventaActual;

    renderizarTabla();

    actualizarResumen();

}

/* ===========================
    TABLA
=========================== */

function renderizarTabla() {

    const tbody =

        document.getElementById(
            "detalleVenta"
        );

    tbody.innerHTML = "";

    ventaActual.forEach(

        (
            producto,
            indice
        ) => {

            const subtotal =

                producto.precio *
                producto.cantidad;

            const fila =

                document.createElement(
                    "tr"
                );

            fila.innerHTML =

                `
                <td>
                    ${producto.codigoBarras}
                </td>

                <td
                    class="texto-recortado"
                    title="${producto.nombreProducto}"
                >
                    ${producto.nombreProducto}
                </td>

                <td>

                    <input
                        type="number"
                        min="1"
                        value="${producto.cantidad}"
                        data-indice="${indice}"
                        class="cantidad-producto"
                    >

                </td>

                <td>
                    $${producto.costoUnitario.toFixed(2)}
                </td>

                <td>
                    $${producto.precio.toFixed(2)}
                </td>

                <td>
                    $${producto.iva.toFixed(2)}
                </td>

                <td>
                    $${producto.descuento.toFixed(2)}
                </td>

                <td>
                    $${subtotal.toFixed(2)}
                </td>

                <td>

                    <button
                        class="btn-quitar"
                        data-indice="${indice}"
                    >

                        🗑

                    </button>

                </td>
                `;

            tbody.appendChild(
                fila
            );

        }

    );

    configurarCantidad();

    configurarEliminar();

}

/* ===========================
    EDITAR CANTIDAD
=========================== */

function configurarCantidad() {

    document
        .querySelectorAll(
            ".cantidad-producto"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "change",
                    e => {

                        const indice =

                            Number(
                                e.target.dataset.indice
                            );

                        let cantidad =

                            Number(
                                e.target.value
                            );

                        if (

                            cantidad < 1

                        ) {

                            cantidad = 1;

                        }

                        ventaActual[
                            indice
                        ].cantidad =
                            cantidad;

                        renderizarTabla();

                        actualizarResumen();

                    }
                );

            }
        );

}

/* ===========================
    ELIMINAR PRODUCTO
=========================== */

function configurarEliminar() {

    document
        .querySelectorAll(
            ".btn-quitar"
        )
        .forEach(
            boton => {

                boton.addEventListener(
                    "click",
                    e => {

                        const indice =

                            Number(
                                e.target.dataset.indice
                            );

                        ventaActual.splice(
                            indice,
                            1
                        );

                        renderizarTabla();

                        actualizarResumen();

                    }
                );

            }
        );

}

/* ===========================
    RESUMEN
=========================== */

function actualizarResumen() {

    let items = 0;

    let subtotal = 0;

    let descuento = 0;

    let iva = 0;

    ventaActual.forEach(
        producto => {

            items +=
                producto.cantidad;

            subtotal +=

                producto.precio *
                producto.cantidad;

            descuento +=
                producto.descuento;

            iva +=
                producto.iva;

        }
    );

    const total =

        subtotal
        - descuento
        + iva;

    document.getElementById(
        "cantidadItems"
    ).textContent =
        items;

    document.getElementById(
        "subtotalVenta"
    ).textContent =
        `$${subtotal.toFixed(2)}`;

    document.getElementById(
        "descuentoVenta"
    ).textContent =
        `$${descuento.toFixed(2)}`;

    document.getElementById(
        "ivaVenta"
    ).textContent =
        `$${iva.toFixed(2)}`;

    document.getElementById(
        "totalVenta"
    ).textContent =
        `$${total.toFixed(2)}`;

}
/* ===========================
    BOTONES
=========================== */

function configurarBotones() {

    document
        .getElementById(
            "btnCobrar"
        )
        ?.addEventListener(
            "click",
            cobrarVenta
        );

    document
        .getElementById(
            "btnCancelarVenta"
        )
        ?.addEventListener(
            "click",
            cancelarVenta
        );

    document
        .getElementById(
            "btnNuevaVenta"
        )
        ?.addEventListener(
            "click",
            nuevaVenta
        );

    document
        .getElementById(
            "btnAnularVenta"
        )
        ?.addEventListener(
            "click",
            anularVenta
        );

    document
        .getElementById(
            "btnImprimirTicket"
        )
        ?.addEventListener(
            "click",
            imprimirTicket
        );

}

/* ===========================
    COBRAR
=========================== */

function cobrarVenta() {

    if (

        ventaActual.length === 0

    ) {

        alert(
            "No hay productos en la venta"
        );

        return;

    }

    let subtotal = 0;

    let descuento = 0;

    let iva = 0;

    ventaActual.forEach(
        producto => {

            subtotal +=
                producto.precio *
                producto.cantidad;

            descuento +=
                producto.descuento;

            iva +=
                producto.iva;

        }
    );

    const total =

        subtotal
        - descuento
        + iva;

    const recibido = Number(

        prompt(
            `TOTAL: $${total.toFixed(2)}\n\nIngrese importe recibido`
        )

    );

    if (

        isNaN(recibido)

    ) {

        return;

    }

    if (

        recibido < total

    ) {

        alert(
            "Importe insuficiente"
        );

        return;

    }

    const cambio =

        recibido - total;

    const metodoPago =

        document.getElementById(
            "metodoPago"
        ).value;

    const venta = {

        fecha:
            new Date().toISOString(),

        metodoPago,

        productos:
            ventaActual,

        subtotal,

        descuento,

        iva,

        total,

        recibido,

        cambio

    };

    agregarVenta(
        venta
    );

    descontarStock();

    alert(

    `Venta registrada\n\nCambio: $${cambio.toFixed(2)}`

);

/* ===========================
    CERRAR VENTA COBRADA
=========================== */

delete ventasAbiertas[
    ventaSeleccionada
];

const ventasRestantes =

    Object.keys(
        ventasAbiertas
    );

if (

    ventasRestantes.length === 0

) {

    ventasAbiertas = {

        1: []

    };

    ventaSeleccionada = 1;

}
else {

    ventaSeleccionada =

        Number(
            ventasRestantes[0]
        );

}

ventaActual =

    ventasAbiertas[
        ventaSeleccionada
    ];

renderizarTabla();

actualizarResumen();

renderizarPestanas();

actualizarTituloVenta();


}

/* ===========================
    STOCK
=========================== */

function descontarStock() {

    const productosSistema =

        obtenerProductos();

    ventaActual.forEach(
        item => {

            const producto =

                productosSistema.find(
                    p =>

                        p.codigoBarras ===
                        item.codigoBarras
                );

            if (producto) {

                producto.stock =

                    Number(
                        producto.stock
                    )

                    -

                    Number(
                        item.cantidad
                    );

            }

        }
    );

    guardarProductos(
        productosSistema
    );

}

/* ===========================
    NUEVA VENTA
=========================== */

function nuevaVenta() {

    const nuevaId =

        Object.keys(
            ventasAbiertas
        ).length + 1;

    ventasAbiertas[
        nuevaId
    ] = [];

    ventaSeleccionada =
        nuevaId;

    ventaActual =

        ventasAbiertas[
            nuevaId
        ];

    renderizarTabla();

    actualizarResumen();

    renderizarPestanas();

}
/* ===========================
    CANCELAR
=========================== */

function cancelarVenta() {

    const confirmar =

        confirm(
            "¿Cancelar la venta actual?"
        );

    if (

        !confirmar

    ) return;

    delete ventasAbiertas[
        ventaSeleccionada
    ];

    const ventasRestantes =

        Object.keys(
            ventasAbiertas
        );

    if (

        ventasRestantes.length === 0

    ) {

        ventasAbiertas = {

            1: []

        };

        ventaSeleccionada = 1;

    }

    else {

        ventaSeleccionada =

            Number(
                ventasRestantes[0]
            );

    }

    ventaActual =

        ventasAbiertas[
            ventaSeleccionada
        ];

    renderizarTabla();

    actualizarResumen();

    renderizarPestanas();

    actualizarTituloVenta();

}

/* ===========================
    ANULAR
=========================== */

function anularVenta() {

    alert(
        "Función disponible en una próxima versión"
    );

}

/* ===========================
    TICKET
=========================== */

function imprimirTicket() {

    alert(
        "Impresión de ticket disponible próximamente"
    );

}
/* ===========================
    PESTAÑAS DE VENTA
=========================== */

function renderizarPestanas() {

    const contenedor =

        document.querySelector(
            ".ventas-tabs"
        );

    if (!contenedor) return;

    contenedor.innerHTML = "";

    Object.keys(
        ventasAbiertas
    ).forEach(
        id => {

            const boton =

                document.createElement(
                    "button"
                );

            boton.textContent =
                `Venta ${id}`;

            if (

                Number(id) ===
                ventaSeleccionada

            ) {

                boton.classList.add(
                    "venta-activa"
                );

            }

            boton.addEventListener(
                "click",
                () => {

                    ventaSeleccionada =
                        Number(id);

                    ventaActual =

                        ventasAbiertas[
                            id
                        ];
                    
                    actualizarTituloVenta();

                    renderizarTabla();

                    actualizarResumen();

                    renderizarPestanas();

                }
            );

            contenedor.appendChild(
                boton
            );

        }
    );

    const btnNueva =

        document.createElement(
            "button"
        );

    btnNueva.id =
        "btnNuevaPestanaVenta";

    btnNueva.textContent =
        "+";

    btnNueva.addEventListener(
        "click",
        nuevaVenta
    );

    contenedor.appendChild(
        btnNueva
    );

}