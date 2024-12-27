const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Habilitar CORS
app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Ruta para guardar el correo
app.post("/guardarCorreo", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("Correo no proporcionado");
    }

    const filePath = path.join(__dirname, "txt", "subs.txt");
    const data = `${email}\n`;

    // Agregar el correo al archivo
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error("Error al escribir en el archivo:", err);
            return res.status(500).send("Error al guardar el correo");
        }
        res.send("Correo guardado correctamente");
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.get('/contarCorreos', (req, res) => {
    // Inspección de la ruta base
    console.log("El valor de __dirname es:", __dirname);

    // Generar el path del archivo
    const filePath = path.resolve(__dirname, "./txt/subs.txt");
    console.log("Path resuelto para subs.txt:", filePath);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
        console.error("Archivo no encontrado en la ruta:", filePath);
        return res.status(404).json({ error: 'Archivo no encontrado.' });
    }

    // Leer el contenido del archivo
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ error: 'No se pudo leer el archivo.' });
        }

        const correos = data.split('\n').filter(line => line.trim() !== ''); // Filtra líneas no vacías
        console.log("Número de correos encontrados:", correos.length);
        res.json({ total: correos.length });
    });
});
