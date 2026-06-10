console.log("ARCHIVO usuarios.js cargado");
import {

    obtenerUsuarios,
    guardarUsuarios

}
from "../../services/usuariosService.js";
let usuarioEditando = null;

export function configurarUsuarios() {
    console.log(
        "FUNCION configurarUsuarios ejecutada"
    );

    cargarUsuarios();

    const formulario =
        document.getElementById(
            "formUsuario"
        );

    formulario.addEventListener(
        "submit",
        guardarNuevoUsuario
    );

}
function cargarUsuarios() {

    const usuarios =
        obtenerUsuarios();

    const tbody =
        document.querySelector(
            "#tablaUsuarios tbody"
        );

    tbody.innerHTML = "";

    usuarios.forEach(usuario => {

        tbody.innerHTML += `
        

            <tr>

                <td>${usuario.nombre}</td>

                <td>${usuario.apellido}</td>

                <td>${usuario.usuario}</td>

                <td>${usuario.rol}</td>

                <td>${usuario.estado}</td>
                <td>

<button
    class="btnEditar"
    data-usuario="${usuario.usuario}"
>

Editar

</button>

${
usuario.estado === "Activo"

?

`

<button
    class="btnDesactivar"
    data-usuario="${usuario.usuario}"
>

Desactivar

</button>

`

:

`

<button
    class="btnActivar"
    data-usuario="${usuario.usuario}"
>

Activar

</button>

`

}

</td>

            </tr>

        `;

    });
    configurarBotonesDesactivar();
    configurarBotonesActivar();
    configurarBotonesEditar();

}
function guardarNuevoUsuario(e) {
    console.log(
        "BOTON GUARDAR PRESIONADO"
    );

    e.preventDefault();

    const nombre =
        document.getElementById(
            "nombre"
        ).value;

    const apellido =
        document.getElementById(
            "apellido"
        ).value;

    const usuario =
        document.getElementById(
            "usuario"
        ).value;

    const password =
        document.getElementById(
            "password"
        ).value;
        if (
    nombre.trim() === "" ||
    apellido.trim() === "" ||
    usuario.trim() === "" ||
    password.trim() === ""
) {

    alert(
        "Todos los campos son obligatorios"
    );

    return;
}

    const rol =
        document.getElementById(
            "rol"
        ).value;

    const usuarios =
        obtenerUsuarios();

    const existeUsuario =
    usuarios.some(
        u =>
        u.usuario === usuario
    );
    
if (existeUsuario) {

    alert(
        "El usuario ya existe"
    );

    return;
}
if (usuarioEditando) {

    const usuarioExistente =

        usuarios.find(
            u =>
            u.usuario ===
            usuarioEditando
        );

    usuarioExistente.nombre =
        nombre;

    usuarioExistente.apellido =
        apellido;

    usuarioExistente.usuario =
        usuario;

    usuarioExistente.password =
        password;

    usuarioExistente.rol =
        rol;

    guardarUsuarios(
        usuarios
    );

    usuarioEditando =
        null;

    cargarUsuarios();

    document.getElementById(
        "formUsuario"
    ).reset();

    return;
}
    usuarios.push({

        nombre,
        apellido,
        usuario,
        password,
        rol,
        estado: "Activo"

    });

    guardarUsuarios(
        usuarios
    );

    cargarUsuarios();

    document.getElementById(
        "formUsuario"
    ).reset();

}
function configurarBotonesDesactivar() {

    const botones =

        document.querySelectorAll(
            ".btnDesactivar"
        );

    botones.forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    desactivarUsuario(
                        boton.dataset.usuario
                    );

                }
            );

        }
    );

}

function configurarBotonesEditar() {

    const botones =

        document.querySelectorAll(
            ".btnEditar"
        );

    botones.forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    editarUsuario(
                        boton.dataset.usuario
                    );

                }
            );

        }
    );

}
function desactivarUsuario(
    usuarioBuscado
) {

    const usuarios =
        obtenerUsuarios();

    const usuario =
        usuarios.find(
            u =>
            u.usuario ===
            usuarioBuscado
        );

    if (!usuario) return;

    usuario.estado =
        "Inactivo";

    guardarUsuarios(
        usuarios
    );

    cargarUsuarios();

}
function editarUsuario(
    usuarioBuscado
) {

    const usuarios =
        obtenerUsuarios();

    const usuario =
        usuarios.find(
            u =>
            u.usuario ===
            usuarioBuscado
        );

    if (!usuario) return;

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
        usuario.password;

    document.getElementById(
        "rol"
    ).value =
        usuario.rol;

        usuarioEditando =
    usuario.usuario;

}
function configurarBotonesActivar() {

    const botones =

        document.querySelectorAll(
            ".btnActivar"
        );

    botones.forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    activarUsuario(
                        boton.dataset.usuario
                    );

                }
            );

        }
    );

}
function activarUsuario(
    usuarioBuscado
) {

    const usuarios =
        obtenerUsuarios();

    const usuario =
        usuarios.find(
            u =>
            u.usuario ===
            usuarioBuscado
        );

    if (!usuario) return;

    usuario.estado =
        "Activo";

    guardarUsuarios(
        usuarios
    );

    cargarUsuarios();

}