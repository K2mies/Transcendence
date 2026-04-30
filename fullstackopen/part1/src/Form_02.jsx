import { useForm } from "react-hook-form";
import ControlledInput from "./ControlledInput";

const MyForm = () => {
  const { handleSubmit, control, watch } = useForm();
  const username = watch("username");
  const password = watch("password");

  console.log(username, password);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* USERNAME */}
      <ControlledInput
        control={control}
        name="username"
        label="Username"
        rules={{
          required: "Username is required",
          minLength: {
            value: 3,
            message: "At least 3 characters",
          },
          pattern: {
            value: /^[A-Za-z0-9_-]+$/,
            message: "Only letters, numbers, _ and -",
          },
          validate: {
            noStart: (v) => !/^[_-]/.test(v) || "Cannot start with _ or -",
            noEnd: (v) => !/[_-]$/.test(v) || "Cannot end with _ or -",
          },
        }}
      />

      {/* PASSWORD */}
      <ControlledInput
        control={control}
        name="password"
        label="Password"
        type="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "At least 8 characters",
          },
          validate: {
            noSpaces: (v) => !/\s/.test(v) || "Password cannot contain spaces",
            hasUpper: (v) => /[A-Z]/.test(v) || "Must include uppercase letter",
            hasLower: (v) => /[a-z]/.test(v) || "Must include lowercase letter",
            hasNumber: (v) => /\d/.test(v) || "Must include a number",
          },
        }}
      />

      <input type="submit" />
    </form>
  );
};

export default MyForm;
