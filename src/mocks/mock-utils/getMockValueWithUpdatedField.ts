/**
 * Accepts and object and updates its fields with new values
 *
 * @param originalMockValue
 * @param fieldsToUpdate
 * @returns {MockValueType}
 */
export const getMockValueWithUpdatedFields = <MockValueType extends object>(
  originalMockValue: MockValueType,
  fieldsToUpdate: Partial<MockValueType>
): MockValueType => {
  return { ...originalMockValue, ...fieldsToUpdate };
};
