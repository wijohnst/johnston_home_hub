import axios from "axios";

import { DefaultURL } from "../../constants";
export interface Chore {
  _id: string;
  name: string;
  intervalDays: number;
  lastCompleted: Date;
}

export interface ChoreData {
  message: string;
  status: number;
  data: Chore[];
}

export const fetchChoreData = async (): Promise<ChoreData> => {
  try {
    const { data } = await axios.get<ChoreData>(`${DefaultURL}/chores/`, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error: any) {
    return error;
  }
};

export const postNewChore = async (
  name: string,
  intervalDays: string,
  lastCompleted: Date | undefined
): Promise<any> => {
  try {
    console.log("Posting new chore...");
    const { data } = await axios.post<{ status: number; message: string }>(
      `${DefaultURL}/chores/`,
      {
        name,
        intervalDays,
        lastCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("POST: new chore complete...");
  }
};

export const updateExistingChoreCompletionDate = async (
  choreId: string
): Promise<any> => {
  try {
    console.log("Updating chore completion date...");
    const { data } = await axios.patch<{ status: number; message: string }>(
      `${DefaultURL}/chores/`,
      {
        choreId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("PATCH: chore update request complete...");
  }
};
