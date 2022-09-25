import { getDaysOfTheWeekListGroupItems } from "./ScheduleRepeatRecipeModal.utils";

describe("Schedule Repeat Recipe Modal unit tests", () => {
  describe("getDaysOfTheWeekListGroupItems unit test", () => {
    it("Should return the correct array of ListGroupItems", () => {
      const expectedArray = [
        { text: "Sun.", value: 0 },
        { text: "Mon.", value: 1 },
        { text: "Tue.", value: 2 },
        { text: "Wed.", value: 3 },
        { text: "Thur.", value: 4 },
        { text: "Fri.", value: 5 },
        { text: "Sat.", value: 6 },
      ];

      expect(getDaysOfTheWeekListGroupItems()).toEqual(expectedArray);
    });
  });
});
