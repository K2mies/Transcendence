import { useNavigate } from "react-router-dom";
import { useForm, useController } from "react-hook-form";
import { useState } from "react";
import { Alert, TextField } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UpdateUsernameProps = {
  setUpdateUsernameMode: (updateUsernameMode: boolean) => void;
  myCurrUser: string | undefined;
  setMyCurrUser: (myCurrUser: string | undefined) => void;
  editRef: any;
  setMyOldUser: (myOldUser: string | undefined) => void;
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
  myCurrUser,
  setMyCurrUser,
  editRef,
  setMyOldUser
}: UpdateUsernameProps) {
  const navigate = useNavigate();
  const [updateError, setUpdateError] = useState<string | undefined>(undefined);
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
      setMyOldUser(myCurrUser);
      setMyCurrUser(newName);

      window.dispatchEvent(new Event("auth-changed"));

      navigate(`/user/${encodeURIComponent(newName)}`);
      setUpdateUsernameMode(false);
    } else {
      setUpdateError(data.message || "Failed to save username. Please try again.");
    }
  }
  return (
    <>
      <form className="flex flex-col md:flex-row p-2 min-w-0" onSubmit={handleSubmit(update)}>
        <div className="flex flex-col">
          <label htmlFor="update-username" className="font-semibold mb-2 block">
            Username:
          </label>
          <TextField
            inputRef={editRef}
            id="update-username"
            placeholder="Give new username..."
            autoFocus={true}
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
              if (updateError) setUpdateError(undefined);
            }}
            onBlur={field.onBlur}
            value={field.value}
            name={name}
            error={!!error}
          />
        </div>
        <div className="flex flex-row pt-[2em] gap-3">
          <input
            className="h-[2.5em] ml-3 cursor-pointer bg-secondary text-primary px-4 py-2 rounded hover:text-primary"
            type="submit"
            value="Save"
          ></input>
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
      <div>
        {error || updateError ? (
          <Alert severity="error" variant="filled">
            {error ? error.message : updateError}
          </Alert>
        ) : null}
      </div>
    </>
  );
}

export default UpdateUsername;
