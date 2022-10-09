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
const useFilter = <T>(
  dataToFilter: T[],
  filterPropertyName?: keyof T
): [FilterState<T>, FilterActions] => {
  const [filterValue, setFilterValue] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<T[] | null>(null);

  React.useEffect(() => {
    if (dataToFilter.length !== 0) {
      const filteredData = dataToFilter.filter((value) => {
        if (typeof value === "string") {
          if (value?.toLowerCase().search(filterValue?.toLowerCase()) !== -1) {
            return value;
          }
        }

        if (value && typeof value === "object" && filterPropertyName) {
          if (value && typeof value[filterPropertyName] !== "string") {
            throw Error(
              "`fitlerPropertyName` does not reference an object property in `dataToFilter<T>[]`. dataToFilter[0].filterPropertyName should reference a string."
            );
          } else {
            /*
									`value[filterPropertyName]` must be aliased as `valueToMatch` to call any string methods against it. 
			
									See this issue:
									https://github.com/microsoft/TypeScript/issues/10530
								*/
            const valueToMatch = value[filterPropertyName];
            if (
              typeof valueToMatch === "string" &&
              valueToMatch?.toLowerCase().search(filterValue?.toLowerCase()) !==
                -1
            ) {
              return value;
            }
          }
        }
        return null;
      });
      setFilteredData(filteredData);
    }
  }, [filterValue, dataToFilter, filterPropertyName]);

  return [{ filteredData }, { setFilterValue }];
};

export default useFilter;
