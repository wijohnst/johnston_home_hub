import * as React from "react";

import Form from "react-bootstrap/Form";

import { getSuggestedString } from "./AutoCompleteInput.utils";

interface Props<ObjectType> {
  onChange: (autoCompleteValue: any) => void;
  properties: {
    key: keyof ObjectType;
    suggestionMatcher: string;
  }[];
  isInvalid: boolean;
}

const AutoCompleteInput = <ObjectType,>({
  onChange,
  properties,
  isInvalid,
}: Props<ObjectType>) => {
  const [inputValue, setInputValue] = React.useState("");
  const [suggestedValue, setSuggestedValue] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const matchers = properties.map((property) => property.suggestionMatcher);

  const handleChange = (event: any) => {
    if (inputRef.current !== null) {
      const suggestedString = getSuggestedString(
        inputRef.current.value,
        matchers
      );
      if (suggestedString) {
        setSuggestedValue(suggestedString);
      } else {
        setSuggestedValue(inputRef.current.value);
      }
    }
  };

  const handleFocus = (): void => {
    setInputValue("");
  };

  React.useEffect(() => {
    if (inputValue === "" && inputRef.current !== null) {
      inputRef.current.focus();
    }
    if (inputValue !== "") {
      onChange(inputValue);
    }
  }, [inputValue, onChange]);

  return (
    <>
      {inputValue !== "" && (
        <Form.Control
          type="text"
          onChange={handleChange}
          value={inputValue}
          onFocus={handleFocus}
          isInvalid={isInvalid}
        />
      )}
      {inputValue === "" && (
        <div
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          <Form.Control
            type="text"
            onChange={handleChange}
            ref={inputRef}
            onBlur={() => {
              setInputValue(suggestedValue);
            }}
            isInvalid={isInvalid}
          />
          {isInvalid && <Form.Text>An item name is required.</Form.Text>}
          {!isInvalid && (
            <>
              <Form.Label style={{ margin: ".35rem 0 0 0" }}>
                Suggestions
              </Form.Label>
            </>
          )}
          <Form.Control
            type="text"
            disabled
            value={suggestedValue}
            placeholder={"Click Tab to accept suggestion."}
          />
        </div>
      )}
    </>
  );
};

export default AutoCompleteInput;
