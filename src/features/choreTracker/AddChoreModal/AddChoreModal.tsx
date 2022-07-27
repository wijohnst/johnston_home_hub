import * as React from "react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchChoreData, postNewChore } from "../choreTrackerApi";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type Props = {
  isShown: boolean;
  handleHide: () => void;
};
const AddChoreModal = ({ isShown, handleHide }: Props): React.ReactElement => {
  const { data } = useQuery("choreData", fetchChoreData);
  const choreNames = React.useMemo(() => {
    const chores = data?.data;
    return chores?.map((chore) => chore.name);
  }, [data]);

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .test(
        "is-chore-unique",
        "This chore already exists. Please select a unique name.",
        (value) => {
          if (choreNames?.includes(value ?? "")) {
            return false;
          }
          return true;
        }
      )
      .required("Please include a name."),
    intervalDays: yup.string().required(),
  });
  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(formSchema),
  });

  const queryClient = useQueryClient();

  const addNewChoreMutation = useMutation(
    "addNewChore",
    (data: any) => {
      return postNewChore(data.name, data.intervalDays, data.lastCompleted);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("choreData");
        handleHide();
      },
    }
  );

  const onSubmit = (data: { [key: string]: string | Date }) =>
    addNewChoreMutation.mutate(data);

  return (
    <Modal show={isShown} onHide={handleHide}>
      <Container>
        <Row>
          <Modal.Header closeButton>
            <Modal.Title>Add A New Chore</Modal.Title>
          </Modal.Header>
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>What is the chore named?</Form.Label>
              <Controller
                control={control}
                name="name"
                render={({
                  field: { onChange, ref },
                  fieldState: { error },
                }) => (
                  <Form.Control
                    type="text"
                    placeholder="Enter a chore name."
                    onChange={onChange}
                    ref={ref}
                    isInvalid={!!error}
                  />
                )}
              />
              {formState.errors.name && (
                //@ts-ignore
                <Form.Text>{formState.errors.name.message}</Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>
                How often does the chore need to be completed, in days?
              </Form.Label>
              <Controller
                control={control}
                name="intervalDays"
                render={({
                  field: { onChange, ref },
                  fieldState: { error },
                }) => (
                  <Form.Control
                    type="number"
                    placeholder="Number of days."
                    onChange={onChange}
                    ref={ref}
                    isInvalid={!!error}
                  />
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                When was the last time you completed the chore?
              </Form.Label>
              <Controller
                control={control}
                name="lastCompleted"
                render={({
                  field: { onChange, ref },
                  fieldState: { error },
                }) => (
                  <Form.Control
                    type="date"
                    onChange={(event: React.SyntheticEvent<HTMLDataElement>) =>
                      onChange(new Date(event.currentTarget.value))
                    }
                    ref={ref}
                    isInvalid={!!error}
                  />
                )}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Chore
            </Button>
          </Form>
        </Row>
        <Row>
          <br />
        </Row>
      </Container>
    </Modal>
  );
};

export default AddChoreModal;
