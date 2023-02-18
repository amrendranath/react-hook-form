import "../index.css";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@mui/material";
import Input from "../components/Input";

type ControllerFormProps = {
  login: (email: string, password: string) => Promise<unknown>;
};

type FormValues = {
  email: string;
  password: string;
};

export default function ControllerForm({ login }: ControllerFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await login(data.email, data.password);
    reset();
  };

  // console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id="email"
            label="Email"
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
        )}
        rules={{
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        }}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id="password"
            label="Password"
            type="password"
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />
        )}
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
