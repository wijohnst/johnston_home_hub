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
  id: string;
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
  pets: Pets;
  feedStatus: FeedStatus;
}

export type UpdateFeederStatusResponse = FeedStatus;

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

export const updateFeederStatus = async (
  targetDate: string,
  targetMeal: MealTypes,
  petsToUpdate: string[]
): Promise<UpdateFeederStatusResponse> => {
  try {
    const { data } = await axios.patch<UpdateFeederStatusResponse>(
      "api/pets/feeder",
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

/*
 * WHAT DO YOU NEED TO DO?

	1. PATCH FeederData.feedStatus with updated Pet/s names when fed
	2. Add UI to PetFeeder to feed all pets
	3. Add functionality to PetFeeder UI to feed individual pet
 */
