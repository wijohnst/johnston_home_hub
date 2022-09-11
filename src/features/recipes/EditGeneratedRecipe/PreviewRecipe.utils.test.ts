import { Ingredient } from "../recipesApi";
import { getIngredientString } from "./PreviewRecipe.utils";

describe("Preview Recipe Utils unit tests", () => {
  describe("getIngredientString unit tests", () => {
    it("Should return the correct string", () => {
      const someIngredient: Ingredient = {
        name: "Corn",
        quantity: 6,
        unit: "ears",
        linkedItem: null,
      };

      const correcString = "Corn, 6 ears";

      expect(getIngredientString(someIngredient)).toEqual(correcString);
    });

    it("Should return the correct string for an incomplete ingredient", () => {
      const someIncompleteIngredient: Ingredient = {
        name: "6 ears of Corn",
        quantity: null,
        unit: null,
        linkedItem: null,
      };

      expect(getIngredientString(someIncompleteIngredient)).toEqual(
        someIncompleteIngredient.name
      );
    });
  });
});
