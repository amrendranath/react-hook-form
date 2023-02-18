import "../index.css";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import RHFInput from "../components/RHFInput";

type UseControllerFormProps = {
  login: (email: string, password: string) => Promise<unknown>;
};

type FormValues = {
  email: string;
  password: string;
};

export default function UseControllerForm({ login }: UseControllerFormProps) {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await login(data.email, data.password);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <RHFInput
        name="email"
        control={control}
        id="email"
        label="Email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        }}
      />
      <RHFInput
        name="password"
        control={control}
        id="password"
        label="Password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 5,
            message: "Password must be greater than 5 character",
          },
        }}
      />
      <Button type="submit">SUBMIT</Button>
    </form>
  );
}
