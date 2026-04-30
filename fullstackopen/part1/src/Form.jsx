import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(
    watch("firstName"),
    watch("lastName"),
    watch("userName"),
    watch("password"),
    watch("gender"),
    watch("age"),
  );

  //if (watch("firstName") == "Ross" && watch("lastName") == "Hvidsten")
  //  console.log("name is validated");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue="First Name"
        {...register("firstName", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {errors.firstName && <span>First Name is invalid</span>}
      <input
        defaultValue="Last Name"
        {...register("lastName", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {errors.lastName && <span>last Name is invalid</span>}
      <input
        defaultValue="User Name"
        {...register("userName", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {errors.lastName && <span>User Name is invalid</span>}
      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
            message:
              "Password must be 8+ chars, include upper, lower, number, and special character",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <select
        {...register("gender", {
          required: true,
          validate: (value) => value !== "none",
        })}
      >
        <option value="none">none</option>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="cat">cat</option>
        <option value="dog">dog</option>
      </select>
      {errors.gender && <span>Please select a valid gender</span>}
      <input
        placeholder="Age"
        type="number"
        {...register("age", { required: true, min: 18, max: 99 })}
      />
      {errors.age && <span>Age must be between 18 and 99</span>}
      <input type="submit" />
    </form>
  );
};

export default Form;
