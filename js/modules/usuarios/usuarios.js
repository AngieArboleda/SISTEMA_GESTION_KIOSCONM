import {
    obtenerUsuarios,
    guardarUsuarios
}
from "./usuariosStorage.js";

let usuarioEditando = null;

export function configurarUsuarios(){

    const formulario =
        document.getElementById(
            "formUsuario"
        );

    const tabla =
        document.querySelector(
            "#tablaUsuarios tbody"
        );

    const buscar =
    document.getElementById(
        "buscarUsuario"
    );

const campoPassword =
    document.getElementById(
        "password"
    );

const togglePassword =
    document.getElementById(
        "togglePasswordUsuario"
    );

if(
    campoPassword &&
    togglePassword
){

    togglePassword.addEventListener(
        "mousedown",
        () => {

            campoPassword.type =
                "text";

        }
    );

    togglePassword.addEventListener(
        "mouseup",
        () => {

            campoPassword.type =
                "password";

        }
    );

    togglePassword.addEventListener(
        "mouseleave",
        () => {

            campoPassword.type =
                "password";

        }
    );

}

listarUsuarios();

    listarUsuarios();

    formulario?.addEventListener(
        "submit",
        guardarUsuario
    );

    document
        .getElementById(
            "btnBuscarUsuario"
        )
        ?.addEventListener(
            "click",
            buscarUsuarios
        );

    document
        .getElementById(
            "btnLimpiarBusquedaUsuario"
        )
        ?.addEventListener(
            "click",
            () => {

                buscar.value = "";

                listarUsuarios();

            }
        );

    document
        .getElementById(
            "perfil"
        )
        ?.addEventListener(
            "change",
            aplicarPerfil
        );

    function guardarUsuario(e){

        e.preventDefault();

        const usuarios =
            obtenerUsuarios();

        const usuarioInput =
            document.getElementById(
                "usuario"
            ).value.trim();

        const password =
            document.getElementById(
                "password"
            ).value;

        if(

            !usuarioEditando &&

            usuarios.some(
                usuario =>

                    usuario.usuario ===
                    usuarioInput

            )

        ){

            alert(
                "El usuario ya existe"
            );

            return;

        }

        const permisos = {

            crearUsuario:
                document.getElementById(
                    "crearUsuario"
                ).checked,

            editarUsuario:
                document.getElementById(
                    "editarUsuario"
                ).checked,

            desactivarUsuario:
                document.getElementById(
                    "desactivarUsuario"
                ).checked,

            crearProducto:
                document.getElementById(
                    "crearProducto"
                ).checked,

            editarProducto:
                document.getElementById(
                    "editarProducto"
                ).checked,

            desactivarProducto:
                document.getElementById(
                    "desactivarProducto"
                ).checked,

            ventas:
                document.getElementById(
                    "ventas"
                ).checked,

            inventario:
                document.getElementById(
                    "inventario"
                ).checked,

            proveedores:
                document.getElementById(
                    "proveedores"
                ).checked,

            caja:
                document.getElementById(
                    "caja"
                ).checked,

            reportes:
                document.getElementById(
                    "reportes"
                ).checked

        };

        if(usuarioEditando){

            const usuario =
                usuarios.find(
                    usuario =>
                        usuario.id ===
                        usuarioEditando
                );

            usuario.nombre =
                document.getElementById(
                    "nombre"
                ).value;

            usuario.apellido =
                document.getElementById(
                    "apellido"
                ).value;

            usuario.usuario =
                usuarioInput;

            usuario.perfil =
                document.getElementById(
                    "perfil"
                ).value;

            usuario.permisos =
                permisos;

            if(
                password.trim() !== ""
            ){

                usuario.password =
                    password;

            }

            usuarioEditando =
                null;

        }else{

            usuarios.push({

                id:
                    Date.now(),

                nombre:
                    document.getElementById(
                        "nombre"
                    ).value,

                apellido:
                    document.getElementById(
                        "apellido"
                    ).value,

                usuario:
                    usuarioInput,

                password:
                    password,

                perfil:
                    document.getElementById(
                        "perfil"
                    ).value,

                permisos:
                    permisos,

                estado:
                    "Activo"

            });

        }

        guardarUsuarios(
            usuarios
        );

        formulario.reset();

        listarUsuarios();

    }

    function listarUsuarios(){

        tabla.innerHTML = "";

        obtenerUsuarios()
            .forEach(
                usuario => {

                    tabla.innerHTML += `

                    <tr>

                        <td>
                            ${usuario.nombre}
                        </td>

                        <td>
                            ${usuario.apellido}
                        </td>

                        <td>
    ${usuario.usuario}
</td>

<td>

    <span
        id="password-${usuario.id}"
    >
        ********
    </span>

    <button
        class="btnVerPassword"
        data-id="${usuario.id}"
        data-password="${usuario.password}"
    >
        👁
    </button>

</td>

<td>
    ${usuario.perfil}
</td>

                        <td>
                            ${usuario.estado}
                        </td>

                        <td>

                            <button
                                class="btnEditarUsuario"
                                data-id="${usuario.id}"
                            >

                                ✏️

                            </button>

                            <button
                                class="btnEstado"
                                data-id="${usuario.id}"
                            >

                                ${
                                    usuario.estado ===
                                    "Activo"

                                    ?

                                    "🚫"

                                    :

                                    "✅"
                                }

                            </button>

                        </td>

                    </tr>

                    `;

                }
            );

        eventosEstado();

eventosEditar();

eventosVerPassword();

    }

    function eventosEditar(){

        document
            .querySelectorAll(
                ".btnEditarUsuario"
            )
            .forEach(
                boton => {

                    boton.addEventListener(
                        "click",
                        editarUsuario
                    );

                }
            );

    }
    function eventosVerPassword(){

    document
        .querySelectorAll(
            ".btnVerPassword"
        )
        .forEach(
            boton => {

                boton.addEventListener(
                    "click",
                    function(){

                        const id =
                            this.dataset.id;

                        const span =
                            document.getElementById(
                                `password-${id}`
                            );

                        if(
                            span.textContent ===
                            "********"
                        ){

                            span.textContent =
                                this.dataset.password;

                        }else{

                            span.textContent =
                                "********";

                        }

                    }
                );

            }
        );

}

    function editarUsuario(){

        const id =
            Number(
                this.dataset.id
            );

        const usuario =
            obtenerUsuarios()
            .find(
                usuario =>
                    usuario.id ===
                    id
            );

        if(!usuario){

            return;

        }

        usuarioEditando =
            id;

        document.getElementById(
            "nombre"
        ).value =
            usuario.nombre;

        document.getElementById(
            "apellido"
        ).value =
            usuario.apellido;

        document.getElementById(
            "usuario"
        ).value =
            usuario.usuario;

        document.getElementById(
            "password"
        ).value =
            "";

        document.getElementById(
            "perfil"
        ).value =
            usuario.perfil;

        Object.keys(
            usuario.permisos
        ).forEach(
            permiso => {

                const checkbox =
                    document.getElementById(
                        permiso
                    );

                if(checkbox){

                    checkbox.checked =
                        usuario.permisos[
                            permiso
                        ];

                }

            }
        );

    }

    function eventosEstado(){

        document
            .querySelectorAll(
                ".btnEstado"
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

        const usuarios =
            obtenerUsuarios();

        const usuario =
            usuarios.find(
                usuario =>
                    usuario.id ===
                    id
            );

        if(
            usuario.usuario ===
            "admin"
        ){

            alert(
                "No se puede desactivar el administrador principal"
            );

            return;

        }

        usuario.estado =

            usuario.estado ===
            "Activo"

            ?

            "Inactivo"

            :

            "Activo";

        guardarUsuarios(
            usuarios
        );

        listarUsuarios();

    }

    function buscarUsuarios(){

        const texto =
            buscar.value
            .toLowerCase();

        tabla.innerHTML = "";

        obtenerUsuarios()

            .filter(
                usuario =>

                    usuario.nombre
                        .toLowerCase()
                        .includes(
                            texto
                        )

                    ||

                    usuario.usuario
                        .toLowerCase()
                        .includes(
                            texto
                        )
            )

            .forEach(
                usuario => {

                    tabla.innerHTML += `

                    <tr>

                        <td>
                            ${usuario.nombre}
                        </td>

                        <td>
                            ${usuario.apellido}
                        </td>

                        <td>
                            ${usuario.usuario}
                        </td>

                        <td>
                            ${usuario.perfil}
                        </td>

                        <td>
                            ${usuario.estado}
                        </td>

                        <td>

                            -

                        </td>

                    </tr>

                    `;

                }
            );

    }

    function aplicarPerfil(){

        const perfil =
            this.value;

        const permisos = [

            "crearUsuario",
            "editarUsuario",
            "desactivarUsuario",
            "crearProducto",
            "editarProducto",
            "desactivarProducto",
            "ventas",
            "inventario",
            "proveedores",
            "caja",
            "reportes"

        ];

        permisos.forEach(
            permiso => {

                document.getElementById(
                    permiso
                ).checked =
                    false;

            }
        );

        if(
            perfil ===
            "Administrador"
        ){

            permisos.forEach(
                permiso => {

                    document.getElementById(
                        permiso
                    ).checked =
                        true;

                }
            );

        }

        if(
            perfil ===
            "Vendedor"
        ){

            document.getElementById(
                "ventas"
            ).checked = true;

            document.getElementById(
                "inventario"
            ).checked = true;

        }

    }

}