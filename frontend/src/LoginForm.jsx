import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "./ControlledInput";

const schema = z
  .object({
    username: z.string(),

    password: z.string(),
  })

const LoginForm = () => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      user: "",
      password: ""
    },
  });

  const onSubmit = async (data) => {
	try {
		const response = await fetch("https://backend:4242/api/v1/login", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const res = response.json();
		if (response.ok)
			console.log("Login was successful");
		else
			console.error(res);
	} catch (error) {
		console.error(error);
	}
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <ControlledInput control={control} name="username" label="Username" />

      <ControlledInput control={control} name="password" label="Password" type="password" />

      <input type="submit" />
    </form>
  );
};

export default LoginForm;
