import axios from "axios";

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
