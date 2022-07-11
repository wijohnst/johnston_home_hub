import * as React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PetIcon from "./PetIcon/PetIcon";

import { PetName, IconNameWrapper } from "./PetFeeder.style";

import { ReactComponent as OpalIcon } from "../../assets/images/opal.svg";
import { ReactComponent as RudyIcon } from "../../assets/images/rudy.svg";
import { ReactComponent as BellaIcon } from "../../assets/images/bella.svg";

enum MealTypes {
  BREAKFAST,
  DINNER,
}
const PetFeeder = (): React.ReactElement => {
  const [targetMeal, setTargetMeal] = React.useState<MealTypes>(
    MealTypes.BREAKFAST
  );

  return (
    <Container>
      <Row>
        <Col>
          <PetIcon isFed={false}>
            <IconNameWrapper>
              <OpalIcon />
              <PetName>Opal</PetName>
            </IconNameWrapper>
          </PetIcon>
        </Col>
        <Col>
          <PetIcon isFed={true}>
            <IconNameWrapper>
              <RudyIcon />
              <PetName>Rudy</PetName>
            </IconNameWrapper>
          </PetIcon>
        </Col>
        <Col>
          <PetIcon isFed={true}>
            <IconNameWrapper>
              <BellaIcon />
              <PetName>Bella</PetName>
            </IconNameWrapper>
          </PetIcon>
        </Col>
      </Row>
    </Container>
  );
};

export default PetFeeder;
