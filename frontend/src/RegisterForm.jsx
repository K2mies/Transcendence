import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "./ControlledInput";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    name: z
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

const RegisterForm = () => {
  const navigate = useNavigate();
  const [registerStatus, setRegisterStatus] = useState("init");
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      age: 18,
      password: "",
      confirmPassword: "",
    },
  });

  //this is excluding confirm password and age from the final object created(add any exceptions here)
  const onSubmit = async (data) => {
    const { confirmPassword, age, ...submitData } = data;
    await fetch("http://localhost:4243/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setRegisterStatus("Registration was successful!");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(result.data.user));
          navigate("/dashboard");
        } else setRegisterStatus(result.error);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        control={control}
        name="name"
        label="Username"
        autoComplete="off"
      />

      <ControlledInput
        control={control}
        name="email"
        label="Email"
        autoComplete="on"
        type="email"
      />

      <ControlledInput
        control={control}
        name="password"
        label="Password"
        autoComplete="off"
        type="password"
      />

      <ControlledInput
        control={control}
        name="confirmPassword"
        label="Retype password"
        autoComplete="off"
        type="password"
      />

      <ControlledInput
        control={control}
        name="age"
        label="Age"
        autoComplete="off"
        type="number"
      />

      <input type="submit" />

      {registerStatus !== "init" && (
        <div>
          <p>{registerStatus}</p>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
