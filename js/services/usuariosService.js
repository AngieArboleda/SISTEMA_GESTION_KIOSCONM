const CLAVE_USUARIOS =
    "usuarios";

export function obtenerUsuarios() {

    const usuarios = JSON.parse(
        localStorage.getItem(
            CLAVE_USUARIOS
        )
    );

    if (usuarios) {

        return usuarios;

    }

    const usuariosIniciales = [

        {
            id: 1,
            nombre: "Administrador",
            apellido: "Sistema",
            usuario: "admin",
            password: "1234",
            rol: "Administrador",
            estado: "Activo"
        }

    ];

    localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify(
            usuariosIniciales
        )
    );

    return usuariosIniciales;

}

export function guardarUsuarios(
    usuarios
){

    localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify(
            usuarios
        )
    );

}