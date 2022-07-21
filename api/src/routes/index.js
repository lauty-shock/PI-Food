const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipeRoute = require("./recipe");
const dietRoute = require("./diet");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipeRoute);
router.use("/diets", dietRoute);

module.exports = router;