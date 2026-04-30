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
          required: "Username is required",
          minLength: {
            value: 3,
            message: "At least 3 characters",
          },
          maxLength: {
            value: 20,
            message: "Max 20 characters",
          },
          pattern: {
            value: /^[A-Za-z0-9_-]+$/,
            message: "Only letters, numbers, _ and -",
          },
          validate: {
            noStart: (v) => !/^[_-]/.test(v) || "Cannot start with _ or -",
            noEnd: (v) => !/[_-]$/.test(v) || "Cannot end with _ or -",
          },
        })}
      />
      {errors.userName && <span>User Name is invalid</span>}
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
      <input
        type="email"
        placeholder="email"
        {...register("email", {
          required: "Email is required",
          message: "you must enter a valid email",
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
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
