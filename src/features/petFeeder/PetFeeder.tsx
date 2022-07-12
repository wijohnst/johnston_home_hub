import * as React from "react";

import { useQuery } from "react-query";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import PetIcon from "./PetIcon/PetIcon";

import {
  FeederHeader,
  FeederSubheader,
  PetName,
  IconNameWrapper,
  MealControls,
  MealButtonWrapper,
  MealStatus,
} from "./PetFeeder.style";

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

  const { isFetched, isFetching, data, isRefetching } = useQuery(
    "feederData",
    fetchFeederData
  );

  const targetFeedStatus = data?.feedStatus[targetMeal];
  const pets = data?.pets;

  return (
    <>
      {isFetching && !isRefetching && <span>Fetching Feeder Data...</span>}
      {isFetched && (
        <Container>
          <Row>
            <FeederHeader>Baby Dinner Time</FeederHeader>
            <FeederSubheader>
              <b>Meal:</b>{" "}
              {targetMeal
                .trim()
                .toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase())}
            </FeederSubheader>
          </Row>
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
                    <MealStatus>
                      {targetFeedStatus && targetFeedStatus.includes(pet.name)
                        ? ""
                        : "has not been fed"}
                    </MealStatus>
                  </IconNameWrapper>
                </PetIcon>
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <MealControls>
                <MealButtonWrapper>
                  <Button
                    variant="outline-dark"
                    disabled={targetMeal === MealTypes.BREAKFAST}
                    onClick={() => setTargetMeal(MealTypes.BREAKFAST)}
                  >
                    Breakfast
                  </Button>
                </MealButtonWrapper>
                <MealButtonWrapper>
                  <Button
                    variant="outline-dark"
                    disabled={targetMeal === MealTypes.DINNER}
                    onClick={() => setTargetMeal(MealTypes.DINNER)}
                  >
                    Dinner
                  </Button>
                </MealButtonWrapper>
              </MealControls>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PetFeeder;
