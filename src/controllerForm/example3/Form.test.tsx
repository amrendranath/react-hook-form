import { render } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import Form, { FormValues } from "./Form";

/**
 * TypeError: Cannot read properties of undefined (reading 'array')
 */

const Wrapper = ({ children }: { children: JSX.Element }) => {
  const methods = useForm<FormValues>();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("Form", () => {
  it("should render form component", () => {
    render(
      <Wrapper>
        <Form />
      </Wrapper>
    );
  });
});
