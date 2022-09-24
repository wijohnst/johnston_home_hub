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

export const Breakpoints: { [key: string]: string } = {
  mobile: "(max-width: 480px)",
  tablet: "(max-width: 768px)",
  laptop: "(max-width: 1024px)",
  desktop: "(min-width: 1025px)",
};

export const RegularExpressions = {
  newLine: /\r?\n/,
  hyphen: /[-]/,
  specialCharacters: /[|&;$%@"<>()+,-]/g,
};

export enum LinkTypes {
  PRIMARY = "primary",
  DANGER = "danger",
  SUCCESS = "success",
}
