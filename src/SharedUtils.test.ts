import { getDayOfTheWeekValueFromDate } from "./SharedUtils";

describe("Shared Utils unit tests", () => {
  describe("getDayOfTheWeekValueFromDate unit tests", () => {
    const testCases = [
      {
        // Monday
        testDate: new Date("10/03/2022"),
        expected: 0,
      },
      {
        // Tuesday
        testDate: new Date("10/04/2022"),
        expected: 1,
      },
      {
        // Wedneday
        testDate: new Date("10/05/2022"),
        expected: 2,
      },
      {
        // Thursday
        testDate: new Date("10/06/2022"),
        expected: 3,
      },
      {
        // Friday
        testDate: new Date("10/07/2022"),
        expected: 4,
      },
      {
        // Saturday
        testDate: new Date("10/08/2022"),
        expected: 5,
      },
      {
        // Sunday
        testDate: new Date("10/09/2022"),
        expected: 6,
      },
      {
        // Monday
        testDate: new Date("10/10/2022"),
        expected: 0,
      },
    ];

    testCases.forEach((test) => {
      it(`Should return ${test.expected} for the date ${test.testDate}`, () => {
        expect(getDayOfTheWeekValueFromDate(test.testDate)).toBe(test.expected);
      });
    });
  });
});
