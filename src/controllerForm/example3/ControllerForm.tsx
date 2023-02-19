import "../../index.css";
import { useForm, FormProvider } from "react-hook-form";
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
  const methods = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await login(data.email, data.password);
    methods.reset();
  };

  // console.log(errors);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <Form />
        <Button type="submit">SUBMIT</Button>
      </form>
    </FormProvider>
  );
}
