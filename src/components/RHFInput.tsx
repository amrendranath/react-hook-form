import React from "react";
import { TextField, InputLabel, TextFieldProps } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

type RHFInputProps = {
  label: string;
  id: string;
} & TextFieldProps &
  UseControllerProps<FormValues>;

const RHFInput = React.forwardRef((props: RHFInputProps, ref) => {
  const { label, id, control, name, ...rest } = props;
  const {
    field,
    formState: { errors },
  } = useController({ name, control });

  console.log("error >>>,", errors);
  return (
    <>
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <TextField
        {...field}
        id={id}
        inputRef={ref}
        size="small"
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message}
        {...rest}
      />
    </>
  );
});

export default RHFInput;
