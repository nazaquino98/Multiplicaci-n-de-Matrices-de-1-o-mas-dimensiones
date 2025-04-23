const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/multiplicar', (req, res) => {
    const { matriz1, matriz2 } = req.body;

    // Validaciones básicas
    if (!matriz1 || !matriz2 || !Array.isArray(matriz1) || !Array.isArray(matriz2)) {
        return res.status(400).json({ error: 'Datos de matrices inválidos.' });
    }

    const filas1 = matriz1.length;
    const columnas1 = matriz1[0].length;
    const filas2 = matriz2.length;
    const columnas2 = matriz2[0].length;

    // Validar si se pueden multiplicar
    if (columnas1 !== filas2) {
        return res.status(400).json({ error: 'El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz.' });
    }

    // Inicializar resultado con ceros
    const resultado = Array.from({ length: filas1 }, () => Array(columnas2).fill(0));

    // Multiplicación de matrices
    for (let i = 0; i < filas1; i++) {
        for (let j = 0; j < columnas2; j++) {
            for (let k = 0; k < columnas1; k++) {
                resultado[i][j] += matriz1[i][k] * matriz2[k][j];
            }
        }
    }

    res.json({ resultado });
});

// Levantar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
