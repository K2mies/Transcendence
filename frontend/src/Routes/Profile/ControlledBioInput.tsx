import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

type ControlledBioInputProps = {
  control: any;
  name: string;
  label: string;
  autoComplete: string | undefined;
};

const ControlledBioInput = ({
  control,
  name,
  label,
  autoComplete,
}: ControlledBioInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <>
      <TextField
        {...field}
        id={field.name}
        className="w-full"
        label={label}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "var(--color-tertiary)",
          },
        }}
        autoComplete={autoComplete}
        aria-label={label}
        error={!!error}
        helperText={error?.message}
        multiline
        maxRows={10}
      />
    </>
  );
};

export default ControlledBioInput;
