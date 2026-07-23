import { useNavigate } from "react-router-dom";
import { useForm, useController } from "react-hook-form";
import { useState } from "react";
import { TextField } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UpdateUsernameProps = {
  setUpdateUsernameMode: (updateUsernameMode: boolean) => void;
  setMyCurrUser: (myCurrUser: string | undefined) => void;
};

type FormValues = {
  name: string;
};

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

function UpdateUsername({
  setUpdateUsernameMode,
  setMyCurrUser,
}: UpdateUsernameProps) {
  const navigate = useNavigate();
  const [editError, setEditError] = useState<string | undefined>(undefined);
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const name = "name";
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  async function update(values: FormValues) {
    const newName = values.name;

    const newData: { name: string } = {
      name: newName,
    };
    const response: Response = await fetch(
      "http://localhost:4243/auth/username",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newData),
      },
    );

    const data = await response.json();
    if (response.status === 200) {
      const myUser = JSON.parse(localStorage.getItem("user") ?? "{}") as {
        id: number;
      };

      const newUserData: { id: number; name: string } = {
        id: myUser.id,
        name: newName,
      };

      localStorage.setItem("user", JSON.stringify(newUserData));

      setMyCurrUser(newName);
      navigate(`/user/${encodeURIComponent(newName)}`);
      setUpdateUsernameMode(false);
    } else {
      setEditError(data.error || "Error saving username. Please try again.");
      setTimeout(() => {
        setEditError("");
      }, 5000);
    }
  }
  return (
    <>
      <form className="flex flex-row p-2" onSubmit={handleSubmit(update)}>
        <div className="flex flex-col">
          <label htmlFor="update-username" className="font-semibold mb-2 block">Username:</label>
          <TextField
            id="update-username"
            className="w-87.5"
            placeholder="Give new username..."
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "var(--color-tertiary)",
                height: "2.5em",
              },
              "& .MuiInputLabel-root": {
                color: "black",
              },
            }}
            type="text"
            autoComplete="off"
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            onBlur={field.onBlur}
            value={field.value}
            name={name}
            inputRef={field.ref}
            error={!!error}
          />
        </div>
        <div className="flex flex-row pt-[2em] gap-3">
          <input className="h-[2.5em] ml-3 cursor-pointer bg-secondary text-primary px-4 py-2 rounded hover:text-primary" type="submit" value="Save"></input>
          <button
            type="button"
            className="h-[2.5em] bg-secondary text-primary px-4 py-2 rounded hover:text-primary"
            onClick={() => {
              setUpdateUsernameMode(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
      {(error || editError) && (
        <p className="bg-red-600 text-white text-sm p-2 ml-3 rounded shadow-lg whitespace-nowrap z-10" aria-live="polite">
          {error ? error.message : editError}
        </p>
      )}
    </>
  );
}

export default UpdateUsername;
