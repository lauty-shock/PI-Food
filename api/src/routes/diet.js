const { Router } = require("express");
const { Diet } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const diets = await Diet.findAll(); //Traigo toda la data de la tabla Diets
    return res.json(diets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
