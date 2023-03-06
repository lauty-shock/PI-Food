const server = require("./src/app.js");
const { conn, Diet } = require("./src/db.js");

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("listening at 3001");

    // Creo un array con los tipos de dietas
    const dietas = [
      "gluten free",
      "ketogenic",
      "vegetarian",
      "lacto vegetarian",
      "ovo vegetarian",
      "vegan",
      "pescetarian",
      "paleo",
      "primal",
      "low fodmap",
      "whole 30",
    ];

    // Precargo cada una de las dietas del array a la base de datos (el id se genera automaticamente)
    dietas.forEach(async (element) => await Diet.create({ tipo: element }));
  });
});
