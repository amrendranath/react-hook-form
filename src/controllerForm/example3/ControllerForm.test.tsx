import { render, screen, fireEvent } from "@testing-library/react";
import ControllerForm from "./ControllerForm";

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

describe("ControllerForm", () => {
  it("should display required error when value is invalid", async () => {
    render(<ControllerForm login={mockLogin} />);
    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findByText("Email is required")).toBeVisible();
    expect(await screen.findByText("Password is required")).toBeVisible();
    expect(mockLogin).not.toBeCalled();
  });

  it("should display matching error when email is invalid", async () => {
    render(<ControllerForm login={mockLogin} />);
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: "test",
      },
    });

    fireEvent.input(screen.getByLabelText("Password"), {
      target: {
        value: "password",
      },
    });

    fireEvent.submit(screen.getByRole("button"));
    expect(
      await screen.findByText("Entered value does not match email format")
    ).toBeVisible();
    expect(mockLogin).not.toBeCalled();
    const usernameInputField = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const passwordInputField = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;
    expect(usernameInputField.value).toBe("test");
    expect(passwordInputField.value).toBe("password");
  });

  it("should display min length error when password is invalid", async () => {
    render(<ControllerForm login={mockLogin} />);
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: "test@mail.com",
      },
    });

    fireEvent.input(screen.getByLabelText("Password"), {
      target: {
        value: "pass",
      },
    });

    fireEvent.submit(screen.getByRole("button"));
    expect(
      await screen.findByText("Password must be greater than 5 character")
    ).toBeVisible();
    expect(mockLogin).not.toBeCalled();
    const usernameInputField = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const passwordInputField = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;
    expect(usernameInputField.value).toBe("test@mail.com");
    expect(passwordInputField.value).toBe("pass");
  });
});
