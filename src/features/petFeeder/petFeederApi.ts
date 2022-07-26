import axios from "axios";

export enum Species {
  DOG,
  CAT,
  BIRD,
}

export enum MealTypes {
  BREAKFAST = "breakfast",
  DINNER = "dinner",
}
export interface Pet {
  _id: string;
  name: string;
  species: Species;
  iconId: string;
}

export type Pets = Pet[];
export interface FeedStatus {
  // human readable date string - 'MM/dd/yyyy'
  date: string;
  // Array of pet names representing pets that have been fed breakfast
  breakfast: string[];
  // Array of pet names representing pets that have been fed dinner
  dinner: string[];
}

export interface FeederData {
  staus: string;
  message: string;
  data: {
    pets: Pets;
    feedStatus: FeedStatus;
  };
}

export type UpdateFeederStatusResponse = FeedStatus;

export const fetchFeederData = async (): Promise<FeederData> => {
  try {
    const { data } = await axios.get<FeederData>(
      "http://localhost:3001/feeder/feederData",
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

export const updateFeederStatus = async (
  targetDate: string,
  targetMeal: MealTypes,
  petsToUpdate: string[]
): Promise<UpdateFeederStatusResponse> => {
  try {
    const { data } = await axios.patch<UpdateFeederStatusResponse>(
      "pets/feeder",
      {
        targetDate,
        targetMeal,
        petsToUpdate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error;
  }
};
