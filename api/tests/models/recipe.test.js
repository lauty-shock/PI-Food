const { Recipe, conn } = require("../../src/db.js");

describe("Recipe model", () => {
  beforeEach(async () => {
    await conn.sync({ force: true });
  });

  it("No debería crear un objeto vacio", async () => {
    expect.assertions(1); 
    try {
      await Recipe.create({});
    } catch (error) {
      expect(error.message).toBeDefined();
    }
  });

  it("debería crear la receta", async () => {
    const recipe = await Recipe.create({
      title: "Milanesa a la napolitana",
      summary: "Tan rikos",
    });
    expect(recipe.toJSON().id).toBeDefined(); //Espera un "id definido"
    expect(recipe.toJSON()).toHaveProperty("title", "Milanesa a la napolitana");
    expect(recipe.toJSON()).toHaveProperty("summary", "Tan rikos");
  });

  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  });
});
