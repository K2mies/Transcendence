import { TextField } from "@mui/material";
import { useController, type Control, type FieldValues } from "react-hook-form";

type ControlledInputProps = {
  control: Control<FieldValues>;
  name: string;
  label: string;
  autoComplete?: string;
  type: string;
};

const ControlledInput = ({
  control,
  name,
  label,
  autoComplete,
  type,
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
          "& .MuiInputLabel-root": {
            color: "var(--color-primary)",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--color-primary)",
          },

          "& .MuiInputLabel-root.Mui-error": {
            color: "#8b0000",
          },

          "& .MuiOutlinedInput-root": {
            backgroundColor: "var(--color-tertiary)",

            "& fieldset": {
              borderColor: "var(--color-primary)",
            },

            "&:hover fieldset": {
              borderColor: "var(--color-primary)",
            },

            "&.Mui-focused fieldset": {
              borderColor: "var(--color-primary)",
            },
          },

          "& .MuiInputBase-input": {
            color: "var(--color-primary)",
          },

          "& .MuiFormHelperText-root": {
            color: "var(--color-primary)",
          },

          "& .MuiFormHelperText-root.Mui-error": {
            color: "#8b0000",
          },
        }}
        type={type}
        autoComplete={autoComplete}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        inputRef={field.ref}
        error={!!error}
        helperText={error?.message}
      />
    </div>
  );
};

export default ControlledInput;
