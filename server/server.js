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