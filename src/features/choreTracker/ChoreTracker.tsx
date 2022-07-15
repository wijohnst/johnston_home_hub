import React from "react";

import { useQuery } from "react-query";

import { ChoreTrackerWrapper } from "./ChoreTracker.style";
import { fetchChoreData } from "./choreTrackerApi";

import ChoreBar from "./ChoreBar/ChoreBar";

type Props = {};

const ChoreTracker = (props: Props) => {
  const { isFetched, data } = useQuery("choreData", fetchChoreData);

  const chores = data?.chores;

  return (
    <ChoreTrackerWrapper>
      {chores ? (
        chores.map((chore) => <ChoreBar chore={chore} />)
      ) : (
        <span>Fetching chores...</span>
      )}
    </ChoreTrackerWrapper>
  );
};

export default ChoreTracker;
