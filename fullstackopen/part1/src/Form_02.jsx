import { useForm } from "react-hook-form";
import ControlledInput from "./ControlledInput";

const MyForm = () => {
  //here we create the variables to be watched and then passed to the console
  //this should be removed when in production to avoid information leaks
  const { handleSubmit, control, watch } = useForm();
  const username = watch("username");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const age = watch("age");
  //this should be removed when in production to avoid information leaks
  console.log(username, email, password, confirmPassword, age);

  //this is excluding confirm password and age from the final object created(add any exceptions here)
  const onSubmit = (data) => {
    const { confirmPassword, age, ...submitData } = data;
    console.log(submitData);
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
          maxLength: {
            value: 20,
            message: "cannot be more than 20 characters",
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
      {/* EMAIL */}
      <ControlledInput
        control={control}
        name="email"
        label="Email"
        type="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
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
      {/* RETYPE PASSWORD */}
      <ControlledInput
        control={control}
        name="confirmPassword"
        label="Retype Password"
        type="password"
        rules={{
          required: "Please retype your password",
          validate: (value) => value === password || "Passwords do not match",
        }}
      />
      {/* AGE */}
      <ControlledInput
        control={control}
        name="age"
        label="Age"
        type="number"
        rules={{
          required: "Age is required",
          valueAsNumber: true,
          min: {
            value: 18,
            message: "Must be at least 18",
          },
          max: {
            value: 99,
            message: "Must be at most 99",
          },
        }}
      />
      <input type="submit" />
    </form>
  );
};

export default MyForm;
