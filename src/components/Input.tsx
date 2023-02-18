import React from "react";
import { TextField, InputLabel, TextFieldProps } from "@mui/material";
// import { useController, UseControllerProps } from "react-hook-form";

// type FormValues = {
//   firstName: string;
//   lastName: string;
// };

type InputProps = {
  label: string;
  id: string;
} & TextFieldProps;
// & UseControllerProps<FormValues>;

const Input = React.forwardRef((props: InputProps, ref) => {
  const { label, id, name, ...rest } = props;
  // const { field } = useController({ name, control });

  return (
    <>
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <TextField id={id} inputRef={ref} size="small" {...rest} />
    </>
  );
});

export default Input;
