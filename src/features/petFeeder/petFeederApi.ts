import axios from "axios";

export interface FeedStatus {
  breakfast: string[];
  dinner: string[];
}

export interface FeederData {
  feedStatus: FeedStatus;
}

export type FetchFeederResponse = { data: FeederData };

export const fetchFeederData = async (): Promise<FetchFeederResponse> => {
  try {
    const { data } = await axios.get<FetchFeederResponse>("api/pets/feeder", {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error: any) {
    return error;
  }
};
