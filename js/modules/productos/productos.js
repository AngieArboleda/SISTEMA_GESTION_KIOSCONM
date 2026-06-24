console.log(
    "MODULO PRODUCTOS CARGADO"
);
import {

    obtenerProductos,
    guardarProductos

}

from "../../services/productosService.js";
import {

    obtenerProveedores

}
from "../proveedores/proveedoresStorage.js";

let productoEditando = null;

export function configurarProductos() {

    console.log(
        "FUNCION PRODUCTOS EJECUTADA"
    );

    cargarProductos();
    cargarProveedores();

    const formulario =

        document.getElementById(
            "formProducto"
        );

    formulario.addEventListener(
        "submit",
        guardarNuevoProducto
    );
    document.getElementById(
    "btnBuscarProducto"
).addEventListener(
    "click",
    buscarProductos
);
document.getElementById(
    "btnLimpiarBusqueda"
).addEventListener(
    "click",
    limpiarBusqueda
);

function limpiarBusqueda() {

    document.getElementById(
        "buscarProducto"
    ).value = "";

cargarProveedores();

}

function cargarProveedores(){

    const selectProveedor =

        document.getElementById(
            "proveedor"
        );

    if(
        !selectProveedor
    ){
        return;
    }

    const proveedores =
        obtenerProveedores();

    selectProveedor.innerHTML =

        `
        <option value="">
            Seleccionar Proveedor
        </option>
        `;

    proveedores
        .filter(
            proveedor =>
                proveedor.estado ===
                "Activo"
        )
        .forEach(
            proveedor => {

                selectProveedor.innerHTML +=
                `
                <option value="${proveedor.nombre}">
                    ${proveedor.nombre}
                </option>
                `;

            }
        );

}

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

                    <td
    title="${producto.codigoBarras}"
>
    ${producto.codigoBarras}
</td>

                    <td
    title="${producto.nombreProducto}"
    class="nombreProductoTabla"
>
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
${
Number(producto.stock)
<=
Number(producto.stockMinimo)
?
"⚠️"
:
""
}
</td>
                    <td>
                        ${producto.stockMinimo}
                    </td>

                    <td>
${
producto.estado === "Activo"
?
"🟢 Activo"
:
"🔴 Inactivo"
}
</td>
                    <td>

<button
class="btnEditarProducto"
data-codigo="${producto.codigoBarras}"
>

Editar

</button>

${

producto.estado === "Activo"

?

`

<button
class="btnDesactivarProducto"
data-codigo="${producto.codigoBarras}"
>

Desactivar

</button>

`

:

`

<button
class="btnActivarProducto"
data-codigo="${producto.codigoBarras}"
>

Activar

</button>

`

}

</td>

                </tr>

            `;

        }
    );
    configurarBotonesEditarProducto();
    configurarBotonesDesactivarProducto();
    configurarBotonesActivarProducto();


}
function configurarBotonesDesactivarProducto() {

    const botones =

        document.querySelectorAll(
            ".btnDesactivarProducto"
        );

    botones.forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    desactivarProducto(
                        boton.dataset.codigo
                    );

                }
            );

        }
    );

}
function configurarBotonesActivarProducto() {

    const botones =

        document.querySelectorAll(
            ".btnActivarProducto"
        );

    botones.forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    activarProducto(
                        boton.dataset.codigo
                    );

                }
            );

        }
    );

}

function buscarProductos() {

    const textoBusqueda =

        document.getElementById(
            "buscarProducto"
        ).value.toLowerCase();

    const productos =
        obtenerProductos();

    const productosFiltrados =

    productos.filter(
        producto =>

            producto.codigoBarras
            .toLowerCase()
            .includes(
                textoBusqueda
            )

            ||

            producto.nombreProducto
            .toLowerCase()
            .includes(
                textoBusqueda
            )

            ||

            producto.categoria
            .toLowerCase()
            .includes(
                textoBusqueda
            )
    );
    const tbody =

        document.querySelector(
            "#tablaProductos tbody"
        );

    tbody.innerHTML = "";

    productosFiltrados.forEach(
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
                        ${producto.estado}
                    </td>

                    <td>

<button
class="btnEditarProducto"
data-codigo="${producto.codigoBarras}"
>

Editar

</button>

${

producto.estado === "Activo"

?

`

<button
class="btnDesactivarProducto"
data-codigo="${producto.codigoBarras}"
>

Desactivar

</button>

`

:

`

<button
class="btnActivarProducto"
data-codigo="${producto.codigoBarras}"
>

Activar

</button>

`

}

</td>

                </tr>

            `;

        }
    );
    configurarBotonesEditarProducto();
configurarBotonesDesactivarProducto();
configurarBotonesActivarProducto();

}

function desactivarProducto(
    codigoBuscado
) {
console.log(
    "DESACTIVAR",
    codigoBuscado
);
    const productos =
        obtenerProductos();

    const producto =
        productos.find(
            p =>
            p.codigoBarras ===
            codigoBuscado
        );

    if (!producto) return;

    producto.estado =
        "Inactivo";

    guardarProductos(
        productos
    );

    cargarProductos();

}
function activarProducto(
    codigoBuscado
) {
    console.log(
    "ACTIVAR",
    codigoBuscado
);

    const productos =
        obtenerProductos();

    const producto =
        productos.find(
            p =>
            p.codigoBarras ===
            codigoBuscado
        );

    if (!producto) return;

    producto.estado =
        "Activo";

    guardarProductos(
        productos
    );

    cargarProductos();

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

if (
    producto.estado ===
    "Inactivo"
) {
    alert(
        "No se puede editar un producto inactivo"
    );
    return;
}

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
    "proveedor"
).value =
    producto.proveedor || "";

document.getElementById(
    "costoUnitario"
).value =
    producto.costoUnitario || "";

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
        const proveedor =
    document.getElementById(
        "proveedor"
    ).value;

const costoUnitario =
    document.getElementById(
        "costoUnitario"
    ).value;

    const precio =
        document.getElementById(
            "precio"
        ).value;
        if (

    Number(precio) <= 0
) {

    alert(
        "El precio debe ser mayor a cero"
    );

    return;

}
if(
    proveedor === ""
){

    alert(
        "Debe seleccionar un proveedor"
    );

    return;

}

if(
    Number(costoUnitario) <= 0
){

    alert(
        "El costo unitario debe ser mayor a cero"
    );

    return;

}
    const stock =
        document.getElementById(
            "stock"
        ).value;
        if (
    Number(stock) < 0
) {

    alert(
        "El stock no puede ser negativo"
    );

    return;

}

    const stockMinimo =
        document.getElementById(
            "stockMinimo"
        ).value;

        if (
    Number(stockMinimo) < 0
) {

    alert(
        "El stock mínimo no puede ser negativo"
    );

    return;

}
if (

    Number(stockMinimo)

    >

    Number(stock)

) {

    alert(
        "El stock mínimo no puede ser mayor al stock"
    );

    return;

}
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

        if (

    codigoBarras !== productoEditando &&

    productos.some(
        p =>
            p.codigoBarras === codigoBarras
    )

) {

    alert(
        "Ya existe un producto con ese código"
    );

    return;

}

    productoExistente.codigoBarras =
        codigoBarras;

    productoExistente.nombreProducto =
        nombreProducto;

    productoExistente.categoria =
        categoria;
    
        productoExistente.proveedor =
    proveedor;

        productoExistente.costoUnitario =
    costoUnitario;

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
    proveedor,
    costoUnitario,
    precio,
    stock,
    stockMinimo,
    estado: "Activo"

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

