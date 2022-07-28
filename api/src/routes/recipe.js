var recipesConst = [
  {
    id: 836472,
    title: "sopa con chocolate",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 98,
    analyzedInstructions: "No me importa",
    diets: ["ketogenic"],
  },
  {
    id: 836473,
    title: "Guiso",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 54,
    analyzedInstructions: "No me importa",
    diets: ["ketogenic"],
  },
  {
    id: 836474,
    title: "Milanesa",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 100,
    analyzedInstructions: "No me importa",
    diets: ["ovo vegetarian"],
  },
  {
    id: 836475,
    title: "hamburguesa",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 8,
    analyzedInstructions: "No me importa",
    diets: ["vegan"],
  },
  {
    id: 836476,
    title: "Emiliano",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 10,
    analyzedInstructions: "No me importa",
    diets: ["pescetarian"],
  },
  {
    id: 836477,
    title: "Fabian",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 1,
    analyzedInstructions: "No me importa",
    diets: ["pescetarian"],
  },
  {
    id: 836478,
    title: "Té de marihuana",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 69,
    analyzedInstructions: "No me importa",
    diets: ["whole 30"],
  },
  {
    id: 836479,
    title: "Browni canabico",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 42,
    analyzedInstructions: "No me importa",
    diets: ["whole 30"],
  },
  {
    id: 8364710,
    title: "Chupetin",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 19,
    analyzedInstructions: "No me importa",
    diets: ["paleo"],
  },
  {
    id: 8364711,
    title: "Lomito",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 87,
    analyzedInstructions: "No me importa",
    diets: ["low fodmap"],
  },
  {
    id: 8364712,
    title: "huevada",
    image:
      "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg",
    dishTypes: "comida",
    summary: "resumen piola",
    healthScore: 38,
    analyzedInstructions: "No me importa",
    diets: ["lacto vegetarian"],
  },
];

const { Router } = require("express");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY, URL_API } = process.env;

const router = Router();

const getRecipesDB = async () => {
  // Retorno todas las recetas de la Database (para guardarlas en una variable al invocar esta función)
  const recipes = await Recipe.findAll({
    include: Diet,
  });

  return recipes;
};

const getRecipesAPI = async () => {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const recipes = await axios.get(
  //   `${URL_API}/recipes/complexSearch?${API_KEY}&addRecipeInformation=true&number=100`  //////Descomentar luego
  // );
  // return recipes.data.results; // Retorno las primeras 100 recetas de la API (para guardarlas en una variable al invocar esta función)

  return recipesConst;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};

const concatenar = async () => {
  const dataDB = await getRecipesDB(); // Guardo las recetas de la base de datos en una constante
  const dataAPI = await getRecipesAPI(); // Guardo las recetas de la API en una constante
  const dataTotal = dataAPI.concat(dataDB); // Concateno todos los datos para tener todas las recetas en un solo array
  return dataTotal; // Retorno el array con todas las recetas (para guardarlas en una variable al invocar esta función)
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const data = await concatenar(); // Guardo en una constante todas las recetas de la base de datos y las primera 100 de la API
    if (!name) return res.json(data);

    const result = await data.filter((d) =>
      d.title.toLowerCase().includes(name.toLocaleLowerCase())
    );
    // Guardo en un array las recetas que contengan la palabra indicada
    // (con toLowerCase paso el titulo de la receta y la palabra "name" a minusculas para que coincidan)

    if (result.length > 0) return res.json(result);
    // Si el array no esta vacío devuelvo los resultados encontrados
    else
      return res
        .status(404)
        .send(`No se encontraron recetas que contengan "${name}"`);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (id.includes("-")) {
    // Si el id incluye un "-" para identificar que es un tipo de id "UUID"

    const recipe = await Recipe.findByPk(id, {
      // Busco la receta que coincida con el id ingresado (incluyo sus tipos de dietas)
      include: {
        model: Diet,
        atributes: ["tipo"],
        through: {
          attributes: [],
        },
      },
    });
    // console.log(recipe.diets);
    // recipe.diets = recipe.diets.map((d) => {
    //   console.log(d.tipo);
    //   return d.tipo;
    // });
    // // recipe.diets = ["hola"];
    // console.log(recipe.diets);
    if (recipe) return res.json(recipe);
    return res.status(404).send({ errorDB: "Receta inexcistente" });
  } else {
    try {
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // const recipeAPI = await axios.get(
      //   `${URL_API}/recipes/${id}/information?${API_KEY}` // Hago un pedido a la API para traer la receta solicitada
      // );

      // const recipe = recipeAPI.data;

      const recipe = recipesConst.find((r) => r.id === Number(id));
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      const detailRecipe = {
        // Creo un nuevo obj solo con las propiedades que quiero de la receta (para no mostrar todo lo de la API)
        title: recipe.title,
        image: recipe.image,
        dishTypes: recipe.dishTypes,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        instructions: recipe.instructions,
        diets: recipe.diets,
      };
      return res.json(detailRecipe);
    } catch (error) {
      return res.status(404).send({ errorAPI: error.message });
    }
  }
});

router.post("/", async (req, res) => {
  const { title, image, dishTypes, summary, healthScore, instructions, diets } =
    req.body;

  try {
    let recipeCreate = await Recipe.create({
      // Creo una nueva receta
      title,
      image,
      dishTypes,
      summary,
      healthScore,
      instructions,
    });

    diets.map(async (dieta) => {
      // Mapeo el array de dietas
      let dietDB = await Diet.findAll({
        where: { tipo: dieta.toLowerCase() }, // Busco la dieta que coincida con el tipo que mandaron
      });
      recipeCreate.addDiet(dietDB); // Hago la relacion entre la receta y la dieta
    });

    if (!title)
      return res
        .status(400)
        .send({ error: "Debe ingresar el title para la receta" });
    if (!summary)
      return res
        .status(400)
        .send({ error: "Debe ingresar un summary del receta" });

    // res.send("Succesfull");
    res.json(recipeCreate);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;
