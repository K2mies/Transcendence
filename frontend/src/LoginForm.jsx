import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "./ControlledInput";

const schema = z
  .object({
    email: z.string(),
    password: z.string(),
  })

const LoginForm = () => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data) => {
	try {
		const response = await fetch("http://backend:4243/auth/login", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const res = response.json();
		if (response.ok)
			console.log("Login was successful");
		else if (response.status === "401")
			console.error("Username or password incorrect") // How to render this text?
		else
			console.error(res);
	} catch (error) {
		console.error(error);
	}
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <ControlledInput control={control} name="email" label="Email" autoComplete="on" type="email" />

      <ControlledInput control={control} name="password" label="Password" autoComplete="off" type="password" />

      <input type="submit" />
    </form>
  );
};

export default LoginForm;
