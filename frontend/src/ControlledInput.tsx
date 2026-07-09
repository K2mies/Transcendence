import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

type ControlledInputProps = {
  control: any;
  name: string;
  label: string;
  autoComplete: string | undefined;
  type: string;
  defaultValue?: string;
};

const ControlledInput = ({
  control,
  name,
  label,
  autoComplete,
  type,
  defaultValue,
}: ControlledInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="mb-3">
      <TextField
        className="w-87.5"
        label={label}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "var(--color-tertiary)",
          },
          "& .MuiInputLabel-root": {
            color: "black",
          },
        }}

        type={type}
        autoComplete={autoComplete}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
        defaultValue={defaultValue || field.value}
        name={field.name}
        inputRef={field.ref}
        error={!!error}
        helperText={error?.message}
      />
    </div>
  );
};

export default ControlledInput;
