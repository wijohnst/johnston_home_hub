import axios from "axios";

export enum Species {
  DOG,
  CAT,
  BIRD,
}
export interface Pet {
  id: string;
  name: string;
  species: Species;
  iconId: string;
}

export type Pets = Pet[];
export interface FeedStatus {
  breakfast: string[];
  dinner: string[];
}

export interface FeederData {
  pets: Pets;
  feedStatus: FeedStatus;
}

export const fetchFeederData = async (): Promise<FeederData> => {
  try {
    const { data } = await axios.get<FeederData>("api/pets/feeder", {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error: any) {
    return error;
  }
};
