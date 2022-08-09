import * as React from "react";

import { useMutation, useQuery, useQueryClient } from "react-query";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

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

import {
  fetchFeederData,
  Pet,
  updateFeederStatus,
  MealTypes,
} from "./petFeederApi";

const getPetIcon = (iconId: string): React.ReactElement => {
  switch (iconId) {
    case "brown-dog":
      return <OpalIcon />;
    case "grey-cat":
      return <RudyIcon />;
    case "torty-cat":
      return <BellaIcon />;
    default:
      //TODO: Replace with generic pet icon
      return <span>NO ICON</span>;
  }
};
const PetFeeder = (): React.ReactElement => {
  const [targetMeal, setTargetMeal] = React.useState<MealTypes>(
    MealTypes.BREAKFAST
  );

  const queryClient = useQueryClient();

  const updateFeedStatusMutation = useMutation(
    "feederUpdate",
    (petsToUpdate: string[]) => {
      return updateFeederStatus(
        responseData?.data.feedStatus.date ?? "",
        targetMeal,
        petsToUpdate
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("feederData");
      },
    }
  );

  const {
    isFetched,
    isFetching,
    data: responseData,
    isRefetching,
  } = useQuery("feederData", fetchFeederData);

  const targetFeedStatus = responseData?.data.feedStatus[targetMeal];
  const pets = responseData?.data.pets;

  const handleIndividualClick = (targetPet: string): void => {
    if (targetFeedStatus) {
      !responseData?.data.feedStatus[targetMeal]?.includes(targetPet)
        ? updateFeedStatusMutation.mutate([...targetFeedStatus, targetPet])
        : updateFeedStatusMutation.mutate(
            targetFeedStatus.filter((petName: string) => petName !== targetPet)
          );
    }
  };

  return (
    <>
      {isFetching && !isRefetching && (
        <Container>
          <Spinner animation="border" />
        </Container>
      )}
      {isFetched && (
        <Container>
          <Row>
            <Col>
              <FeederHeader>Pet Feeder</FeederHeader>
            </Col>
            <Col>
              <FeederSubheader>
                <b>Meal:</b>{" "}
                {targetMeal
                  .trim()
                  .toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </FeederSubheader>
            </Col>
            <Col>
              <FeederSubheader>
                <b>Date:</b>
                {responseData?.data?.feedStatus.date}
              </FeederSubheader>
            </Col>
          </Row>
          <Row>
            {pets?.map((pet: Pet, index: number) => (
              <Col
                key={`pet-icon-${pet._id}`}
                onClick={() => handleIndividualClick(pet.name)}
              >
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
          <Row>
            <Button
              disabled={targetFeedStatus?.length === pets?.length}
              onClick={() => {
                if (pets) {
                  updateFeedStatusMutation.mutate(
                    pets.map((pet: Pet) => pet.name)
                  );
                }
              }}
            >
              {updateFeedStatusMutation.isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Feed all pets"
              )}
            </Button>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PetFeeder;
