// Array para almacenar temporalmente correos registrados
const correosRegistrados = [];

// Función para solicitar el nombre del usuario
function solicitarNombre() {
    const usuarioGuardado = localStorage.getItem("usuario"); // Verifica si el usuario ya está guardado
    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        return usuario.nombre; // Si ya existe, devuelve el nombre
    }

    const nombre = prompt("¡Hola! 😊 ¿Cuál es tu nombre?");
    if (nombre) {
        const usuario = { nombre: nombre, correo: null }; // Inicializa el objeto con nombre
        localStorage.setItem("usuario", JSON.stringify(usuario)); // Guarda el objeto en localStorage
    }
    return nombre || null;
}

// Función para procesar la información: mostrar saludo y preguntar por el newsletter
async function procesarInformacion(nombre) {
    if (nombre) {
        // Mostrar saludo personalizado en la página
        const saludoElement = document.getElementById("saludo");
        saludoElement.textContent = `¡Hola ${nombre}! 🐱 Bienvenido al curioso mundo de los gatos.`;

        // Obtener el número de correos registrados
        const totalCorreos = await obtenerConteoCorreos();

        // Recuperar usuario del localStorage
        const usuario = JSON.parse(localStorage.getItem("usuario")) || { nombre: nombre, correo: null };

        // Verificar si ya se suscribió previamente
        if (!usuario.correo) { // Solo pregunta si no existe correo en el objeto
            const suscripcion = confirm(
                `🎉 ¿Te gustaría unirte a nuestro newsletter de gatitos? 🐾 ¡Ya somos una comunidad de ${totalCorreos} amantes de los felinos! 🐱`
            );
            if (suscripcion) {
                const email = prompt("📧 Por favor, ingresa tu correo electrónico para enviarte las novedades:");
                if (email) {
                    usuario.correo = email; // Actualiza el correo en el objeto
                    localStorage.setItem("usuario", JSON.stringify(usuario)); // Guarda el objeto actualizado
                    enviarCorreoAlServidor(email); // Guarda el correo en el servidor
                    correosRegistrados.push(email); // Agrega el correo al array
                    console.log("Correos registrados temporalmente:", correosRegistrados);
                    localStorage.setItem("usuarioSuscrito", "true"); // Guarda que el usuario está suscrito
                }
            }
        } else {
            console.log("Correo ya registrado:", usuario.correo);
        }
    }
}

// Función para obtener el conteo de correos desde el servidor
async function obtenerConteoCorreos() {
    try {
        const response = await fetch("http://localhost:3000/contarCorreos");
        const data = await response.json();
        return data.total;
    } catch (error) {
        console.error("Error al obtener el conteo de correos:", error);
        return 0; // Si hay error, devuelve 0
    }
}

// Función para mostrar el resultado final
function mostrarResultado() {
    // Verificar si el mensaje ya se mostró
    const mensajeMostrado = localStorage.getItem("mensajeMostrado");

    if (!mensajeMostrado) { // Solo mostrar el mensaje si no se ha mostrado antes
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario && usuario.correo) {
            alert("🎉 ¡Gracias por unirte a nuestra comunidad gatuna! 🐾 Pronto recibirás las mejores noticias felinas. ✨");
        } else {
            alert("¡Gracias por visitarnos! 🐱 Esperamos que disfrutes del contenido sobre el mundo de los gatos.");
        }
        localStorage.setItem("mensajeMostrado", "true"); // Marcar que ya se mostró el mensaje
    }
}

// Función para enviar el correo al servidor
function enviarCorreoAlServidor(email) {
    fetch("http://localhost:3000/guardarCorreo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
    })
        .then((response) => response.text())
        .then((data) => {
            console.log("Correo almacenado en el servidor:", data);
        })
        .catch((error) => {
            console.error("Error al guardar el correo:", error);
        });
}

// Función para mostrar todos los correos registrados temporalmente en consola
function mostrarCorreosRegistrados() {
    console.log("Lista de correos registrados temporalmente:");
    correosRegistrados.forEach((correo, index) => {
        console.log(`${index + 1}. ${correo}`);
    });
}

// Algoritmo principal que ejecuta las funciones en el orden correcto
async function iniciarPagina() {
    const nombre = solicitarNombre(); // Solicitar nombre
    await procesarInformacion(nombre); // Procesar la información
    mostrarResultado(); // Mostrar el resultado final
    mostrarCorreosRegistrados(); // Mostrar correos temporalmente almacenados
}

// Ejecutar la función principal al cargar la página
window.onload = iniciarPagina;
