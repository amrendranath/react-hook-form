import { Controller, useFormContext } from "react-hook-form";
import Input from "../../components/Input";

export type FormValues = {
  email: string;
  password: string;
};

const Form = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();
  return (
    <>
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
    </>
  );
};

export default Form;
