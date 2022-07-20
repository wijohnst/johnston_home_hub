import React from "react";
import add from "date-fns/add";
import parseISO from "date-fns/parseISO";
import intervalToDuration from "date-fns/intervalToDuration";
import format from "date-fns/format";

import ProgressBar from "react-bootstrap/ProgressBar";

import { Chore } from "../choreTrackerApi";

import {
  ChoreBarWrapper,
  ChoreName,
  ProgressDatesWrapper,
  Dates,
  ChoreDates,
} from "./ChoreBar.style";

type Props = {
  chore: Chore;
};

const getCompletionDate = (lastCompletedDate: Date, interval: number): Date => {
  return add(lastCompletedDate, {
    days: interval,
  });
};

const deriveTimeLeftToCompletePercentage = (chore: Chore): number => {
  const completionDate = getCompletionDate(
    parseISO(chore.lastCompleted.toString()),
    chore.intervalDays
  );

  const {
    days = 0,
    months = 0,
    hours = 0,
  } = intervalToDuration({
    start: new Date(),
    end: completionDate,
  });

  const daysToComplete = () => {
    if (days > 0) {
      return days + months * 30;
    }

    // If a chore is due in 12 or more hours, we will consider that as a full day left to complete
    if (days === 0 && hours >= 12) {
      return 1 + months * 30;
    }

    return 0;
  };

  return 100 - Math.round((daysToComplete() / chore.intervalDays) * 100);
};

enum ProgressBarVariants {
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
}

const getVariant = (
  timeLeftToCompletePercentage: number
): ProgressBarVariants => {
  if (timeLeftToCompletePercentage <= 33) {
    return ProgressBarVariants.SUCCESS;
  }

  if (timeLeftToCompletePercentage >= 66) {
    return ProgressBarVariants.DANGER;
  }

  return ProgressBarVariants.WARNING;
};

const ChoreBar = ({ chore }: Props) => {
  const timeLeftToCompletePercentage = React.useMemo(
    () => deriveTimeLeftToCompletePercentage(chore),
    [chore]
  );

  const progressBarVariant = React.useMemo(
    () => getVariant(timeLeftToCompletePercentage),
    [timeLeftToCompletePercentage]
  );

  return (
    <ChoreBarWrapper>
      <ChoreName>{chore.name}</ChoreName>
      <ProgressDatesWrapper>
        <ProgressBar
          striped
          variant={progressBarVariant}
          now={timeLeftToCompletePercentage}
        />
        <Dates>
          <ChoreDates>
            {format(parseISO(chore.lastCompleted.toString()), "EEE dd/yy")}
          </ChoreDates>
          <ChoreDates>
            {format(
              getCompletionDate(
                parseISO(chore.lastCompleted.toString()),
                chore.intervalDays
              ),
              "EEE dd/yy"
            )}
          </ChoreDates>
        </Dates>
      </ProgressDatesWrapper>
    </ChoreBarWrapper>
  );
};

export default ChoreBar;
