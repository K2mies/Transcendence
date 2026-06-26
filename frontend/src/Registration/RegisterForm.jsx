import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "../ControlledInput";
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
      credentials: "include",
      body: JSON.stringify(submitData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setRegisterStatus("Registration was successful!");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(result.data.user));
          window.dispatchEvent(new Event("auth-changed"));
          navigate("/dashboard");
        } else setRegisterStatus(result.error);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <a
        href="http://localhost:4243/auth/google"
        className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-2 px-4 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors mt-4"
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        Sign in with Google
      </a>

      <div className="flex items-center gap-3 my-4">
        <hr className="flex-1 border-gray-300" />
        <span className="text-gray-500 text-sm">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>

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
