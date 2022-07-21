const { Router } = require("express");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY, URL_API } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getRecipesDB = async () => {
  return await Recipe.findAll();
};

const getRecipesAPI = async () => {
  const recipes = await axios.get(
    `${URL_API}/recipes/complexSearch?${API_KEY}&addRecipeInformation=true&number=100`
  );
  return recipes.data.results;
};

const concatenar = async () => {
  const dataDB = await getRecipesDB();
  const dataAPI = await getRecipesAPI();
  const dataTotal = dataAPI.concat(dataDB);
  return dataTotal;
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  const data = await concatenar();

  const result = await data.filter((d) => d.title.toLowerCase().includes(name.toLocaleLowerCase()));

  if (result.length > 0) return res.json(result);
  else return res.status(404).send("No se encontraron recetas con ese nombre");
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (id.includes("-")) {
    const recipe = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        atributes: ["tipo"],
        through: {
          attributes: [],
        },
      },
    });
    if (recipe) return res.json(recipe);
    return res.status(404).send({ errorDB: "Receta inexcistente" });
  } else {
    try {
      const recipeAPI = await axios.get(
        `${URL_API}/recipes/${id}/information?${API_KEY}`
      );
      const recipe = recipeAPI.data;
      const detailRecipe = {
        title: recipe.title,
        image: recipe.image,
        dishTypes: recipe.dishTypes,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        analyzedInstructions: recipe.analyzedInstructions,
        dietas: recipe.diets,
      };
      return res.json(detailRecipe);
    } catch (error) {
      return res.status(404).send({ errorAPI: error.message });
    }
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    image,
    dishTypes,
    summary,
    healthScore,
    analyzedInstructions,
    dietas,
  } = req.body;

  try {
    let recipeCreate = await Recipe.create({
      title,
      image,
      dishTypes,
      summary,
      healthScore,
      analyzedInstructions,
    });

    dietas.map(async (dieta) => {
      let dietDB = await Diet.findAll({
        where: { tipo: dieta.toLowerCase() },
      });
      recipeCreate.addDiet(dietDB);
    });

    if (!title)
      return res
        .status(400)
        .send({ error: "Debe ingresar el title para la receta" });
    if (!summary)
      return res
        .status(400)
        .send({ error: "Debe ingresar un summary del receta" });

    res.send("Succesfull");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
