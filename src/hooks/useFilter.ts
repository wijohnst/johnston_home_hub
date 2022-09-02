import * as React from "react";

interface FilterState<T> {
  /** What data array should be filtered? */
  filteredData: T[] | null;
}

interface FilterActions {
  /** What should happen when the user updates their search term? */
  setFilterValue: (userInput: string) => void;
}

/**
 * Custom hook for filtering an array of type `T` based on a search string
 *
 * @param {dataToFilter<T>} dataToFilter
 * @returns {[FilterState<T>, FilterActions]}
 */
const useFilter = <T>(dataToFilter: T[]): [FilterState<T>, FilterActions] => {
  const [filterValue, setFilterValue] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<T[] | null>(null);

  React.useEffect(() => {
    const filteredData = dataToFilter.filter((value) => {
      if (typeof value === "string") {
        if (value?.toLowerCase().search(filterValue?.toLowerCase()) !== -1) {
          return value;
        }
      }
      return null;
    });
    setFilteredData(filteredData);
  }, [filterValue, dataToFilter]);

  return [{ filteredData }, { setFilterValue }];
};

export default useFilter;
