//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Diet } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console

//////////////////////////////////////////////////////////////////////////
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

    console.log("Tipos de dieta pre-cargadas");
  });
});
