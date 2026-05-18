import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "./ControlledInput";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:4243/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      navigate("/dashboard");
      //if (response.ok)
      //    console.log("Login was successful");
      //else if (response.status === 401)
      //  console.error("Username or password incorrect"); // How to render this text?
      //else console.error(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <input type="submit" />
    </form>
  );
};

export default LoginForm;
