import { getDay } from "date-fns";
import { getDayOfWeekButtonBarContentByCurrentDay } from "./MealPlanner.utils";

describe("Meal Planner Utils Unit Tests", () => {
  describe("getDayOfWeekButtonBarContentByCurrenDay unit tests", () => {
    it("Should return the correct ListGroupContent", () => {
      const correctListGroupContent = [
        {
          text: "Sun.",
          value: 0,
        },
        {
          text: "Mon.",
          value: 1,
        },
        {
          text: "Tue.",
          value: 2,
        },
        {
          text: "Wed.",
          value: 3,
        },
        {
          text: "Thur.",
          value: 4,
        },
        {
          text: "Fri.",
          value: 5,
        },
        {
          text: "Sat.",
          value: 6,
        },
      ];
      expect(getDayOfWeekButtonBarContentByCurrentDay(0)).toEqual(
        correctListGroupContent
      );
    });
  });
});
