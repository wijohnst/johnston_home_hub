import { parseStepsString } from "./EditGeneratedRecipe.utils";

describe("Edit Generated Recipe utils unit tests", () => {
  describe("parseStepString until tests", () => {
    it.skip("Should return the correct array of strings", () => {
      const stepsString = "- Do something\n - Do something else\n";
      const stepsArray = ["Do something", "Do something else"];

      expect(parseStepsString(stepsString)).toEqual(stepsArray);
    });

    it("Should return the correct array of strings when there are no new lines and there are hyphen delimiters.", () => {
      const stepString = "- Do something - Do something else ";
      const stepsArray = ["Do something", "Do something else"];

      expect(parseStepsString(stepString)).toEqual(stepsArray);
    });

    it("Should return the correct array of strings when there are no new lines and there are no hyphen delimiters.", () => {
      const stepString = "Do something Do something else ";
      const stepsArray = ["Do something Do something else"];

      expect(parseStepsString(stepString)).toEqual(stepsArray);
    });
  });
});
