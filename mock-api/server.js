const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite peticiones desde Angular (localhost:4200)
app.use(bodyParser.json());

// Importar rutas
const recipesRoutes = require('./routes/recipes');

// Usar rutas
app.use('/api/recipes', recipesRoutes);

app.listen(PORT, () => {
    console.log(`Mock API escuchando en http://localhost:${PORT}`);
});