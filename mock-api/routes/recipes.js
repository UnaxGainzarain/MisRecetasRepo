const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../mock-data/recipes.json');

// Helper para leer datos
function getRecipes() {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// Helper para guardar datos
function saveRecipes(recipes) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(recipes, null, 2));
}

// GET: Obtener todas
router.get('/', (req, res) => {
    const recipes = getRecipes();
    res.json(recipes);
});

// POST: Crear receta
router.post('/', (req, res) => {
    const recipes = getRecipes();
    const newRecipe = req.body;
    
    // Generar ID simple
    newRecipe.id = Date.now();
    newRecipe.ratings = []; // Inicializamos sin votos
    
    recipes.push(newRecipe);
    saveRecipes(recipes);
    
    res.status(201).json(newRecipe);
});

// PUT: Valorar receta (endpoint especial)
// URL ejemplo: /api/recipes/1/rate
router.put('/:id/rate', (req, res) => {
    const recipes = getRecipes();
    const id = parseInt(req.params.id);
    const { rating } = req.body; // Esperamos { "rating": 5 }

    const recipeIndex = recipes.findIndex(r => r.id === id);
    
    if (recipeIndex !== -1) {
        if (!recipes[recipeIndex].ratings) {
            recipes[recipeIndex].ratings = [];
        }
        recipes[recipeIndex].ratings.push(rating);
        saveRecipes(recipes);
        res.json(recipes[recipeIndex]);
    } else {
        res.status(404).json({ message: "Receta no encontrada" });
    }
});
// GET: Obtener UNA receta por ID
router.get('/:id', (req, res) => {
    const recipes = getRecipes();
    const id = parseInt(req.params.id);
    const recipe = recipes.find(r => r.id === id);

    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ message: "Receta no encontrada" });
    }
});
module.exports = router;