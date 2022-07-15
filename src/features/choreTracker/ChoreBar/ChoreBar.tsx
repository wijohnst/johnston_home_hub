import React from "react";
import { Chore } from "../choreTrackerApi";

type Props = {
  chore: Chore;
};

const ChoreBar = ({ chore }: Props) => {
  return <div>{chore.name}</div>;
};

export default ChoreBar;
