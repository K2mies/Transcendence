import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

const ControlledInput = ({
  control,
  name,
  label,
  rules,
  autoComplete,
  type = "text",
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
    rules, // 👈 use passed rules
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
        }}
        type={type}
        autoComplete={autoComplete}
        onChange={(e) =>
          field.onChange(
            type === "number" ? Number(e.target.value) : e.target.value,
          )
        }
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
