import { render, screen, fireEvent } from "@testing-library/react";
import NativeForm from "./nativeForm";

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

describe("NativeForm", () => {
  it("should display required error when value is invalid", async () => {
    render(<NativeForm login={mockLogin} />);
    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(mockLogin).not.toBeCalled();
  });

  it("should display matching error when email is invalid", async () => {
    render(<NativeForm login={mockLogin} />);
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: "test",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "password",
      },
    });

    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();
    const usernameInputField = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const passwordInputField = screen.getByLabelText(
      "password"
    ) as HTMLInputElement;
    expect(usernameInputField.value).toBe("test");
    expect(passwordInputField.value).toBe("password");
  });

  it("should display min length error when password is invalid", async () => {
    render(<NativeForm login={mockLogin} />);
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: "test@mail.com",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "pass",
      },
    });

    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();
    const usernameInputField = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const passwordInputField = screen.getByLabelText(
      "password"
    ) as HTMLInputElement;
    expect(usernameInputField.value).toBe("test@mail.com");
    expect(passwordInputField.value).toBe("pass");
  });
});
