const axios = require("axios");
const { Router } = require("express");
const { Diet } = require("../db");
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  try {
    const diets = await Diet.findAll();
    return res.json(diets);
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.post("/", async (req, res) => {
//   const { tipo } = req.body;
//   try {
//     const newDiet = await Diet.create({
//       tipo,
//     });
//     res.json(newDiet);
//   } catch (error) {
//     res.send({ error: error.message });
//   }
// });

module.exports = router;
