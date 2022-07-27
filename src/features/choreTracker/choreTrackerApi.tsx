import axios from "axios";
import { number } from "yup";

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
    const { data } = await axios.get<ChoreData>(
      "http://localhost:3001/chores/",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
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
      "http://localhost:3001/chores/",
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
