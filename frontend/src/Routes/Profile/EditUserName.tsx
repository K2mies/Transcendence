import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";

type EditUsernameProps = {
  setEditUsernameMode: (editUsernameMode: boolean) => void;
  myCurrUser: string | null;
  setMyCurrUser: (myCurrUser: string | null) => void;
};

function EditUsername({
  setEditUsernameMode,
  myCurrUser,
  setMyCurrUser,
}: EditUsernameProps) {
  const navigate = useNavigate();
  const [editError, setEditError] = useState<boolean>(false);

  async function update(formData: FormData) {
    const newName: string | undefined = formData.get("name")?.toString();
    if (newName) {
      const newData: { name: string } = {
        name: newName,
      };
      const response: Response = await fetch("http://localhost:4243/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newData),
      });

      if (response.status === 200) {
        await response.json();
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
        setEditError(true);
      }
    } else setEditError(true);
  }
  return (
    <>
      <form className="flex flex-row p-2" action={update}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "var(--color-tertiary)",
            },
          }}
          type="text"
          autoComplete="off"
          name="name"
          label="Name"
          defaultValue={myCurrUser}
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
        <p className="font-bold p-2 ml-3">Username already exists!</p>
      )}
    </>
  );
}

export default EditUsername;
