import * as React from "react";

import { useQuery } from "react-query";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PetIcon from "./PetIcon/PetIcon";

import { PetName, IconNameWrapper } from "./PetFeeder.style";

import { ReactComponent as OpalIcon } from "../../assets/images/opal.svg";
import { ReactComponent as RudyIcon } from "../../assets/images/rudy.svg";
import { ReactComponent as BellaIcon } from "../../assets/images/bella.svg";

import { fetchFeederData, Pet } from "./petFeederApi";

enum MealTypes {
  BREAKFAST = "breakfast",
  DINNER = "dinner",
}

const getPetIcon = (iconId: string): React.ReactElement => {
  switch (iconId) {
    case "brown-dog":
      return <OpalIcon />;
    case "grey-cat":
      return <RudyIcon />;
    case "torty-cat":
      return <BellaIcon />;
    default:
      return <span>NO ICON</span>;
  }
};
const PetFeeder = (): React.ReactElement => {
  const [targetMeal, setTargetMeal] = React.useState<MealTypes>(
    MealTypes.BREAKFAST
  );

  const { isFetched, isFetching, data } = useQuery(
    "feederData",
    fetchFeederData
  );

  const targetFeedStatus = data?.feedStatus[targetMeal];
  const pets = data?.pets;

  return (
    <>
      {isFetching && <span>Fetching Feeder Data...</span>}
      {isFetched && (
        <Container>
          <Row>
            {pets?.map((pet: Pet) => (
              <Col key={`pet-icon-${pet.id}`}>
                <PetIcon
                  isFed={
                    targetFeedStatus
                      ? targetFeedStatus.includes(pet.name)
                      : true
                  }
                >
                  <IconNameWrapper>
                    {getPetIcon(pet.iconId)}
                    <PetName>{pet.name}</PetName>
                  </IconNameWrapper>
                </PetIcon>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default PetFeeder;
