const { Router } = require("express");

// Importar todos los routers;
const recipeRoute = require("./recipe");
const dietRoute = require("./diet");

const router = Router();

// Defino las rutas donde quiero que se ejecuten las routes
router.use("/recipes", recipeRoute);
router.use("/diets", dietRoute);

module.exports = router;
