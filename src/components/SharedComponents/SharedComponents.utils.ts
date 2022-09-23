import { LinkTypes } from "../../constants";

export const getLinkColorByType = (linkType: LinkTypes = LinkTypes.PRIMARY) => {
  switch (linkType) {
    case LinkTypes.PRIMARY:
      return "#069";
    case LinkTypes.DANGER:
      return "#842029";
    case LinkTypes.SUCCESS:
      return "#198753";
    default:
      break;
  }
};
