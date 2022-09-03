import React from "react";

import { useMutation, useQueryClient } from "react-query";

import add from "date-fns/add";
import parseISO from "date-fns/parseISO";
import intervalToDuration from "date-fns/intervalToDuration";
import format from "date-fns/format";

import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";

import { Chore, updateExistingChoreCompletionDate } from "../choreTrackerApi";

import {
  ChoreBarWrapper,
  ChoreName,
  ProgressDatesWrapper,
  Dates,
  ChoreDates,
  NameCheckWrapper,
  CheckWrapper,
} from "./ChoreBar.style";

import { ReactComponent as GreyCheck } from "../../../assets/images/grey_check.svg";
import { ReactComponent as GreenCheck } from "../../../assets/images/green_check.svg";

type Props = {
  chore: Chore;
};

const getCompletionDate = (lastCompletedDate: Date, interval: number): Date => {
  return add(lastCompletedDate, {
    days: interval,
  });
};

/**
 * Accepts a chore and returns an integer representing how much time is left to complete that chore from the current date, expressed as a percentage.
 *
 * Overdue tasks (completiong percentage is negative), will return 100
 *
 * @param {Chore} chore
 * @returns {number}
 */
export const deriveTimeLeftToCompletePercentage = (chore: Chore): number => {
  const completionDate = getCompletionDate(
    parseISO(chore.lastCompleted.toString()),
    chore.intervalDays
  );

  const startDate = new Date();

  const isOverdue = startDate > completionDate;

  // Short circuit on overdue tasks
  if (isOverdue) {
    return 100;
  }

  const {
    days = 0,
    months = 0,
    hours = 0,
  } = intervalToDuration({
    start: startDate,
    end: completionDate,
  });

  const getDaysToComplete = () => {
    if (days > 0) {
      return days + months * 30;
    }

    // If a chore is due in 12 or more hours, we will consider that as a full day left to complete
    if (days === 0 && hours >= 12) {
      return 1 + months * 30;
    }

    return 0;
  };
  const daysToComplete = getDaysToComplete();

  const completionPecentage =
    100 - Math.round((daysToComplete / chore.intervalDays) * 100);

  return completionPecentage;
};

enum ProgressBarVariants {
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
}

const getVariant = (
  timeLeftToCompletePercentage: number
): ProgressBarVariants => {
  if (timeLeftToCompletePercentage < 0) {
    return ProgressBarVariants.DANGER;
  }

  if (timeLeftToCompletePercentage >= 0 && timeLeftToCompletePercentage <= 33) {
    return ProgressBarVariants.SUCCESS;
  }

  if (timeLeftToCompletePercentage >= 66) {
    return ProgressBarVariants.DANGER;
  }

  return ProgressBarVariants.WARNING;
};

const ChoreBar = ({ chore }: Props) => {
  const queryClient = useQueryClient();

  const timeLeftToCompletePercentage = React.useMemo(
    () => deriveTimeLeftToCompletePercentage(chore),
    [chore]
  );

  const progressBarVariant = React.useMemo(
    () => getVariant(timeLeftToCompletePercentage),
    [timeLeftToCompletePercentage]
  );

  const { mutate, isLoading } = useMutation(
    "choreCompletionDateUpdate",
    (choreId: string) => {
      return updateExistingChoreCompletionDate(choreId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("choreData");
      },
    }
  );

  const handleCheckClick = () => {
    mutate(chore._id);
  };

  return (
    <ChoreBarWrapper>
      <NameCheckWrapper>
        <ChoreName>{chore.name}</ChoreName>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <CheckWrapper>
            <GreenCheck onClick={handleCheckClick} />
          </CheckWrapper>
        )}
      </NameCheckWrapper>
      <ProgressDatesWrapper>
        <ProgressBar
          striped
          variant={progressBarVariant}
          now={
            timeLeftToCompletePercentage > 0
              ? timeLeftToCompletePercentage
              : 100
          }
        />
        {timeLeftToCompletePercentage !== 100 && (
          <Dates>
            <ChoreDates>
              {format(parseISO(chore.lastCompleted.toString()), "EEE MM/dd")}
            </ChoreDates>
            <ChoreDates>
              {format(
                getCompletionDate(
                  parseISO(chore.lastCompleted.toString()),
                  chore.intervalDays
                ),
                "EEE MM/dd"
              )}
            </ChoreDates>
          </Dates>
        )}
        {timeLeftToCompletePercentage === 100 && (
          <div className="overdue-wrapper">
            <span>{`OVERDUE - LAST COMPLETED ${format(
              parseISO(chore.lastCompleted.toString()),
              "MM/dd"
            )}`}</span>
          </div>
        )}
      </ProgressDatesWrapper>
    </ChoreBarWrapper>
  );
};

export default ChoreBar;
