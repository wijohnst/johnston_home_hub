export const getEntryValueById = <ReturnType>(
  entries: { _id: string }[],
  targetItemKey: string,
  targetItemId: string
): ReturnType | null => {
  const targetEntry: { [key: string]: any } | undefined = entries.find(
    (entry: { _id: string }) => entry._id === targetItemId
  );

  if (targetEntry) {
    return targetEntry[targetItemKey];
  } else {
    return null;
  }
};
