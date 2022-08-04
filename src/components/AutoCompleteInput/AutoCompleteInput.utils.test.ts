import {
  stringsAreEquivalent,
  getClosestMatch,
  getLongestStringLength,
} from "./AutoCompleteInput.utils";

describe("getLongestStringLength unit tests", () => {
  it("Should return the longest string array's length", () => {
    const shortestStringArray = ["A", "B"];
    const longestStringArray = ["A", "B", "C"];

    const propertyValueArrs = [shortestStringArray, longestStringArray];

    expect(getLongestStringLength(propertyValueArrs)).toEqual(
      longestStringArray.length
    );
  });
});

describe("getClosestMatch unit tests", () => {
  it("Should return the closest matching word", () => {
    const inputValueArray = ["C", "h", "e"];
    const propertyValuesArrs = [
      ["A", "p", "p", "l", "e"],
      ["C", "h", "e", "e", "s", "e"],
      ["B", "a", "c", "o", "n"],
    ];

    expect(getClosestMatch(inputValueArray, propertyValuesArrs)).toEqual(
      propertyValuesArrs[1]
    );
  });

  it("Should return an empty array when no matches are found", () => {
    const inputValueArray = ["C", "h", "e"];
    const propertyValuesArrs = [
      ["A", "p", "p", "l", "e"],
      ["B", "a", "c", "o", "n"],
    ];

    expect(getClosestMatch(inputValueArray, propertyValuesArrs)).toEqual([]);
  });

  it("Should return an empty array when the number of characters in the input array is greater than the longest character array in the properties tuple", () => {
    const inputValueArray = ["C", "h", "e", "s", "s", "m", "e", "n"];
    // We don't want to match `Cheese` with `Chessmen`
    const propertyValuesArrs = [
      ["A", "p", "p", "l", "e"],
      ["C", "h", "e", "e", "s", "e"],
      ["B", "a", "c", "o", "n"],
    ];

    expect(getClosestMatch(inputValueArray, propertyValuesArrs)).toEqual([]);
  });
});

describe("areStringsEquivalent unit tests", () => {
  it("Should return true", () => {
    const inputString = "Foo";
    const comparisonString = "Foo";

    expect(stringsAreEquivalent(inputString, comparisonString)).toEqual(true);
  });

  it("Should ignore capitalization and return true", () => {
    const inputString = "foo";
    const comparisonString = "Foo";

    expect(stringsAreEquivalent(inputString, comparisonString)).toEqual(true);
  });

  it("Should return true when inputString is a substring of comparisonString", () => {
    const inputString = "Che";
    const comparisonString = "Cheese";

    expect(stringsAreEquivalent(inputString, comparisonString)).toEqual(true);
  });

  it("Should return false when inputString is not a substring of comparisonString", () => {
    const inputString = "Chess";
    const comparisonString = "Cheese";

    expect(stringsAreEquivalent(inputString, comparisonString)).toBe(false);
  });
});
