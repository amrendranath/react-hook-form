import "../../index.css";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import Form from "./Form";

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
      <Form control={control} errors={errors} />
      <Button type="submit">SUBMIT</Button>
    </form>
  );
}
