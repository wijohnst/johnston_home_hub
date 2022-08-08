export enum QuantityUnitsEnum {
  EA = "ea.",
  CUP = "C.",
  POUND = "lbs.",
}

export enum AislesEnum {
  BAKERY = "Bakery",
  ITALIAN = "Italian",
  MEXICAN = "Mexican",
  PRODUCE = "Produce",
  DAIRY = "Dairy",
  PHARMACY = "Phramacy",
  CLEANING = "Cleaning Supplies",
}

export const DefaultURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://johnston-home-hub.herokuapp.com";
