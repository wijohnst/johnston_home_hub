import { BootstrapVariant } from "../../SharedTypes";

export const getPrimaryColorByVariant = (
  variant: BootstrapVariant = "primary"
) => {
  switch (variant) {
    case "primary":
      return "#CFE2FF";
    case "danger":
      return "#F8D7DA";
    case "success":
      return "#D1E6DD";
    default:
      return "#069";
  }
};

export const getSecondaryColorByVariant = (
  variant: BootstrapVariant = "primary"
) => {
  switch (variant) {
    case "primary":
      return "#084298";
    case "danger":
      return "#842029";
    case "success":
      return "#0E5132";
    default:
      return "084298";
  }
};
