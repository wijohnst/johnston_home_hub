import axios from "axios";

export interface Chore {
  id: string;
  name: string;
  intervalDays: number;
  lastCompleted: Date;
}

export interface ChoreData {
  chores: Chore[];
}

export const fetchChoreData = async (): Promise<ChoreData> => {
  try {
    const { data } = await axios.get<ChoreData>("chores", {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error: any) {
    return error;
  }
};
