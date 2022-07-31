const request = require("supertest");
const app = require("../../src/app.js");
const { Diet, conn } = require("../../src/db.js");

describe("Diet routes", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });

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

  it("Debería traer los tipos de dietas", async () => {
    const res = await request(app).get("/diets");
    expect(res.body).toHaveLength(11);
  });

  afterAll(() => {
    conn.close();
  });
});
