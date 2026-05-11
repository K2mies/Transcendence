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

  const onSubmit = (data) => {
    const submitData = data;
    console.log(submitData);
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
