import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

type ControlledBioInputProps = {
  control: any;
  name: string;
  label: string;
  autoComplete: string | undefined;
  defaultValue?: string;
}

const ControlledBioInput = ({
  control,
  name,
  label,
  autoComplete,
  defaultValue,
}: ControlledBioInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <>
      <TextField
        className="w-full"
        label={label}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "var(--color-tertiary)",
          },
        }}
        autoComplete={autoComplete}
        onChange={(e) =>
          field.onChange(
            e.target.value,
          )
        }
        onBlur={field.onBlur}
        name={field.name}
        inputRef={field.ref}
        error={!!error}
        helperText={error?.message}
        defaultValue={defaultValue || ""}
        multiline
        maxRows={10}
      />
    </>
  );
};

export default ControlledBioInput;
