export async function cargarVista(ruta) {

    const respuesta = await fetch(ruta);

    const html = await respuesta.text();

    document.getElementById("app").innerHTML = html;

    if (ruta.includes("login.html")) {

        const modulo = await import(
            "../modules/auth/login.js"
        );

        modulo.configurarLogin();
    }

    if (ruta.includes("menu.html")) {

    const modulo = await import(
        "../modules/menu/menu.js"
    );

    modulo.configurarMenu();
}
if (ruta.includes("usuarios.html")) {

    const modulo =
        await import(
            "../modules/usuarios/usuarios.js"
        );

    modulo.configurarUsuarios();
}
if (ruta.includes("productos.html")) {

    const modulo =
        await import(
            "../modules/productos/productos.js"
        );

    modulo.configurarProductos();

}

}