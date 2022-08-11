import React from "react";

import Button from "react-bootstrap/Button";
import { useQuery } from "react-query";

import { ChoreTrackerWrapper } from "./ChoreTracker.style";
import { fetchChoreData } from "./choreTrackerApi";

import ChoreBar from "./ChoreBar/ChoreBar";
import AddChoreModal from "./AddChoreModal/AddChoreModal";

import { deriveTimeLeftToCompletePercentage } from "./ChoreBar/ChoreBar";

type Props = {};

const ChoreTracker = (props: Props) => {
  const { data } = useQuery("choreData", fetchChoreData);
  const [showAddChoreModal, setShowAddChoreModal] = React.useState(false);

  const chores = data?.data.sort(
    (a, b) =>
      deriveTimeLeftToCompletePercentage(b) -
      deriveTimeLeftToCompletePercentage(a)
  );

  return (
    <ChoreTrackerWrapper>
      <h1>Chores</h1>
      {chores ? (
        chores.map((chore) => (
          <ChoreBar
            chore={chore}
            key={`${chore.name}-${chore.lastCompleted}`}
          />
        ))
      ) : (
        <span>Fetching chores...</span>
      )}
      <Button onClick={() => setShowAddChoreModal(true)}>Add New Chore</Button>
      <AddChoreModal
        isShown={showAddChoreModal}
        handleHide={() => setShowAddChoreModal(false)}
      />
    </ChoreTrackerWrapper>
  );
};

export default ChoreTracker;
