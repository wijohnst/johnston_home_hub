import { getMockValueWithUpdatedFields } from "./getMockValueWithUpdatedField";

describe("getMockValueWithUpdatedFields", () => {
  test("✅ should return the mock value with updated fields", () => {
    const originalMockValue = { foo: 1, bar: 2 };

    expect(
      getMockValueWithUpdatedFields(originalMockValue, { foo: 3 })
    ).toEqual(expect.objectContaining({ foo: 3, bar: 2 }));
  });
});
