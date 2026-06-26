import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ControlledInput from "./ControlledInput";

const schema = z.object({
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
});

type FormData = z.infer<typeof schema>;

function OAuthUsernamePicker() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const response = await fetch("http://localhost:4243/auth/username", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.status === "success") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(result.data.user));
      navigate("/dashboard");
    } else {
      setServerError(result.error || "Failed to set username");
    }
  };

  return (
    <div className="bg-secondary flex min-h-screen flex-col items-center justify-center text-center">
      <div className="bg-tertiary p-4 rounded-lg">
        <h2 className="bg-primary text-tertiary p-4 rounded-t-lg">
          Choose your username
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            control={control}
            name="name"
            label="Username"
            autoComplete="off"
          />
          <input type="submit" value="Continue" />
          {serverError && <p>{serverError}</p>}
        </form>
      </div>
    </div>
  );
}

export default OAuthUsernamePicker;
