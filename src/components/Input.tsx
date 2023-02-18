import React from "react";
import { TextField, InputLabel, TextFieldProps } from "@mui/material";

type InputProps = {
  label: string;
  id: string;
} & TextFieldProps;

const Input = React.forwardRef((props: InputProps, ref) => {
  const { label, id, name, ...rest } = props;

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
