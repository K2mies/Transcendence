import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@mui/material";

const MuiCheckBoxForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      checkbox: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="checkbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            onChange={(event) => field.onChange(event.target.checked)}
            inputRef={field.ref}
          />
        )}
      />

      <input type="submit" />
    </form>
  );
};

export default MuiCheckBoxForm;
