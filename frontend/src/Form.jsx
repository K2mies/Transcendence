import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "./ControlledInput";

const schema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be max 20 characters")
      .regex(/^[A-Za-z0-9_-]+$/, "Only letters, numbers, _ and -")
      .refine((value) => !/^[_-]/.test(value), {
        message: "Username cannot start with _ or -",
      })
      .refine((value) => !/[_-]$/.test(value), {
        message: "Username cannot end with _ or -",
      }),

    email: z.email("Please enter a valid email"),

    age: z
      .number()
      .min(18, "Must be at least 18")
      .max(99, "Must be at most 99"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include uppercase letter")
      .regex(/[a-z]/, "Must include lowercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/^\S+$/, "Password cannot contain spaces"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const MyForm = () => {
  const { handleSubmit, control, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      age: 18,
      password: "",
      confirmPassword: "",
    },
  });
  //here we create the variables to be watched and then passed to the console
  //this should be removed when in production to avoid information leaks
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
      <ControlledInput control={control} name="username" label="Username" />

      <ControlledInput
        control={control}
        name="email"
        label="Email"
        type="email"
      />

      <ControlledInput
        control={control}
        name="password"
        label="Password"
        type="password"
      />

      <ControlledInput
        control={control}
        name="confirmPassword"
        label="Retype password"
        type="password"
      />

      <ControlledInput control={control} name="age" label="Age" type="number" />

      <input type="submit" />
    </form>
  );
};

export default MyForm;
