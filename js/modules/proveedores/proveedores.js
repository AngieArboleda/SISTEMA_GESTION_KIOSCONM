import {
    obtenerProveedores,
    guardarProveedores
}
from "./proveedoresStorage.js";

export function configurarProveedores(){

    const formulario =
        document.getElementById(
            "formProveedor"
        );

    const tabla =
        document.getElementById(
            "tablaProveedores"
        );

    const buscar =
        document.getElementById(
            "buscarProveedor"
        );

    let proveedorEditando =
        null;

    listarProveedores();

    formulario?.addEventListener(
        "submit",
        guardarProveedor
    );

    document
        .getElementById(
            "btnBuscarProveedor"
        )
        ?.addEventListener(
            "click",
            buscarProveedor
        );

    document
        .getElementById(
            "btnLimpiarProveedor"
        )
        ?.addEventListener(
            "click",
            () => {

                buscar.value = "";

                listarProveedores();

            }
        );

    function guardarProveedor(
        e
    ){

        e.preventDefault();

        const proveedores =
            obtenerProveedores();

        const nombre =
    document.getElementById(
        "nombreProveedor"
    ).value.trim();

const email =
    document.getElementById(
        "emailProveedor"
    ).value.trim();

const cuit =
    document.getElementById(
        "cuitProveedor"
    ).value.trim();

if(
    nombre === ""
){
    alert(
        "Debe ingresar un nombre de proveedor."
    );
    return;
}


const nombreDuplicado =
    proveedores.some(
        p =>

            p.nombre
            .toLowerCase() ===
            nombre.toLowerCase()
            &&
            p.id !==
            proveedorEditando
    );

if(
    nombreDuplicado
){
    alert(
        "Ya existe un proveedor con ese nombre."
    );
    return;

}

if(
    cuit !== ""
){

    const cuitDuplicado =

        proveedores.some(
            p =>

                p.cuit ===
                cuit

                &&

                p.id !==
                proveedorEditando
        );

    if(
        cuitDuplicado
    ){

        alert(
            "El CUIT ya está registrado."
        );

        return;

    }

}

if(
    email !== ""
){
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(
        !formatoEmail.test(email)
    ){

        alert(
            "Correo electrónico inválido."
        );

        return;

    }

}

        const proveedor = {

            id:
                proveedorEditando
                ||
                Date.now(),

            nombre: nombre,

            contacto:
                document.getElementById(
                    "contactoProveedor"
                ).value,

            telefono:
                document.getElementById(
                    "telefonoProveedor"
                ).value,

            email:
    email,

            direccion:
                document.getElementById(
                    "direccionProveedor"
                ).value,

            cuit:
    cuit,

            estado:
                document.getElementById(
                    "estadoProveedor"
                ).value

        };

        if(
            proveedorEditando
        ){

            const indice =
                proveedores.findIndex(
                    p =>
                    p.id ===
                    proveedorEditando
                );

            proveedores[
                indice
            ] = proveedor;

        }else{

            proveedores.push(
                proveedor
            );

        }

        guardarProveedores(
            proveedores
        );
        alert(
    proveedorEditando
    ?
    "Proveedor actualizado correctamente."
    :
    "Proveedor registrado correctamente."
);

        proveedorEditando =
            null;

        formulario.reset();

        listarProveedores();

    }

    function listarProveedores(){

        const proveedores =
            obtenerProveedores();

        tabla.innerHTML = "";

        proveedores.forEach(
            proveedor => {

                tabla.innerHTML += `

                <tr>

                    <td>${proveedor.nombre}</td>

                    <td>${proveedor.contacto}</td>

                    <td>${proveedor.telefono}</td>

                    <td>${proveedor.email}</td>

                    <td>${proveedor.cuit}</td>

                    <td>${proveedor.estado}</td>

                    <td>

                        <button
                            class="btnEditarProveedor"
                            data-id="${proveedor.id}"
                        >
                            ✏️
                        </button>

                        <button
                            class="btnEstadoProveedor"
                            data-id="${proveedor.id}"
                        >
                            ${
                                proveedor.estado ===
                                "Activo"
                                ? "🚫"
                                : "✅"
                            }
                        </button>

                    </td>

                </tr>

                `;

            }
        );

        actualizarResumen();

        eventosEditar();

        eventosEstado();

    }

    function actualizarResumen(){

        const proveedores =
            obtenerProveedores();

        document.getElementById(
            "totalProveedores"
        ).textContent =
            proveedores.length;

        document.getElementById(
            "proveedoresActivos"
        ).textContent =
            proveedores.filter(
                p =>
                p.estado ===
                "Activo"
            ).length;

        document.getElementById(
            "proveedoresInactivos"
        ).textContent =
            proveedores.filter(
                p =>
                p.estado ===
                "Inactivo"
            ).length;

    }

    function eventosEditar(){

        document
            .querySelectorAll(
                ".btnEditarProveedor"
            )
            .forEach(
                boton => {

                    boton.addEventListener(
                        "click",
                        editarProveedor
                    );

                }
            );

    }

    function editarProveedor(){

        const id =
            Number(
                this.dataset.id
            );

        const proveedor =
            obtenerProveedores()
            .find(
                p =>
                p.id === id
            );

        proveedorEditando =
            proveedor.id;

        document.getElementById(
            "nombreProveedor"
        ).value =
            proveedor.nombre;

        document.getElementById(
            "contactoProveedor"
        ).value =
            proveedor.contacto;

        document.getElementById(
            "telefonoProveedor"
        ).value =
            proveedor.telefono;

        document.getElementById(
            "emailProveedor"
        ).value =
            proveedor.email;

        document.getElementById(
            "direccionProveedor"
        ).value =
            proveedor.direccion;

        document.getElementById(
            "cuitProveedor"
        ).value =
            proveedor.cuit;

        document.getElementById(
            "estadoProveedor"
        ).value =
            proveedor.estado;

    }

    function eventosEstado(){

        document
            .querySelectorAll(
                ".btnEstadoProveedor"
            )
            .forEach(
                boton => {

                    boton.addEventListener(
                        "click",
                        cambiarEstado
                    );

                }
            );

    }

    function cambiarEstado(){

        const id =
            Number(
                this.dataset.id
            );

        const proveedores =
            obtenerProveedores();

        const proveedor =
            proveedores.find(
                p =>
                p.id === id
            );
            if(
    proveedor.estado ===
    "Activo"
){

    const confirmar =

        confirm(
            "¿Desea desactivar este proveedor?"
        );

    if(
        !confirmar
    ){

        return;

    }

}

        proveedor.estado =

            proveedor.estado ===
            "Activo"

            ?

            "Inactivo"

            :

            "Activo";

        guardarProveedores(
            proveedores
        );

        listarProveedores();

    }

    function buscarProveedor(){

        const texto =
            buscar.value
            .toLowerCase();

        const proveedores =
            obtenerProveedores();

        tabla.innerHTML = "";

        proveedores
            .filter(
                proveedor =>

                    proveedor.nombre
                    .toLowerCase()
                    .includes(texto)

                    ||

                    proveedor.contacto
                    .toLowerCase()
                    .includes(texto)
            )
            .forEach(
                proveedor => {

                    tabla.innerHTML += `

                    <tr>

                        <td>${proveedor.nombre}</td>
                        <td>${proveedor.contacto}</td>
                        <td>${proveedor.telefono}</td>
                        <td>${proveedor.email}</td>
                        <td>${proveedor.cuit}</td>
                        <td>${proveedor.estado}</td>
                        <td>-</td>

                    </tr>

                    `;

                }
            );

    }

}