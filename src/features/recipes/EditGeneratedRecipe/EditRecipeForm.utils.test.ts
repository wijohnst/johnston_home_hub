import { getStepsString } from "./EditRecipeForm.utils";

describe("Edit Recipe Form untils unit tests", () => {
  describe("getStepsString unit tests", () => {
    it("Should return the correct string", () => {
      const stepsArray = ["Do something", "Do something else"];
      const stepsString = "- Do something\n- Do something else\n";

      expect(getStepsString(stepsArray)).toEqual(stepsString);
    });
  });
});
