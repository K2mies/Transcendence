import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ControlledInput from "../../ControlledInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type EditUsernameProps = {
  setEditUsernameMode: (editUsernameMode: boolean) => void;
  myCurrUser: string | undefined;
  setMyCurrUser: (myCurrUser: string | undefined) => void;
};

type FormValues = {
  name: string;
}

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
  });

function EditUsername({
  setEditUsernameMode,
  myCurrUser,
  setMyCurrUser,
}: EditUsernameProps) {
  const navigate = useNavigate();
  const [editError, setEditError] = useState<string | undefined>(undefined);

  const { handleSubmit, control } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function update(values: FormValues) {
    const newName = values.name;

    const newData: { name: string } = {
      name: newName,
    };
    const response: Response = await fetch("http://localhost:4243/auth/username", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newData),
    });

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
      setEditUsernameMode(false);
    } else {
      setEditError(data.error || "Error saving username. Please try again.");
    }
  }
  return (
    <>
      <form className="flex flex-row p-2" onSubmit={handleSubmit(update)}>
        <ControlledInput
          control={control}
          name="name"
          label="Username"
          autoComplete="off"
          defaultValue={myCurrUser}
          type="text"
        />
        <div className="flex flex-col">
          <input className="cursor-pointer" type="submit" value="Save"></input>
          <button
            type="button"
            className="ml-3"
            onClick={() => {
              setEditUsernameMode(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
      {editError && (
        <p className="font-bold p-2 ml-3">{editError}</p>
      )}
    </>
  );
}

export default EditUsername;
