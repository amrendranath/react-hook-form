import React from "react";
import { useForm } from "react-hook-form";
import "./index.css";

type AppProps = {
  login: (email: string, password: string) => Promise<unknown>;
};

type FormValues = {
  email: string;
  password: string;
};

export default function App({ login }: AppProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await login(data.email, data.password);
    reset();
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <h1>Login</h1>
        <label htmlFor="email">email</label>
        <input
          id="email"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          type="email"
          placeholder="example@mail.com"
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <label htmlFor="password">password</label>
        <input
          id="password"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", {
            required: "required",
            minLength: {
              value: 5,
              message: "min length is 5",
            },
          })}
          type="password"
          placeholder="password"
        />
        {errors.password && <span role="alert">{errors.password.message}</span>}
      </section>
      <button type="submit">SUBMIT</button>
    </form>
  );
}