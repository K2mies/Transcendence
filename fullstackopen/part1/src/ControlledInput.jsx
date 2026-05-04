import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

const ControlledInput = ({ control, name, label, rules, type = "text" }) => {
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
    <div style={{ marginBottom: "12px" }}>
      <TextField
        style={{ width: "350px" }}
        label={label}
        type={type}
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
