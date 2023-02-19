import { render } from "@testing-library/react";
import { Control, FieldErrors } from "react-hook-form";
import Form, { FormValues } from "./Form";

/**
 * Test like that causes TypeError: Cannot read properties of undefined (reading 'array')
 */

describe("Form", () => {
  it("should render form component", () => {
    render(
      <Form
        control={{} as Control<FormValues>}
        errors={{} as FieldErrors<FormValues>}
      />
    );
  });
});
