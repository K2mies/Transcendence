import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditName({ setEditNameMode, currUser, setCurrUser }) {
  const navigate = useNavigate();
  const [editError, setEditError] = useState(false);
  async function update(formData) {
    const newName = formData.get("name");
    const newData = {
      name: newName,
    };
    const response = await fetch("http://localhost:4243/profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newData),
    });
    if (response.status === 200) {
      await response.json();
      const myUser = JSON.parse(localStorage.getItem("user"));
      const myId = myUser.id;
      const newUserData = {
        id: myId,
        name: newName,
      };
      localStorage.setItem("user", JSON.stringify(newUserData));
      setCurrUser(newName);
      navigate(`/user/${encodeURIComponent(newName)}`);
      setEditNameMode(false);
    } else {
      console.error("Error saving profile changes");
      setEditError(true);
    }
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
          defaultValue={currUser}
        />
        <div className="flex flex-col">
          <input className="cursor-pointer" type="submit" value="Save"></input>
          <button type="button" className="ml-3" onClick={() => { setEditNameMode(false) }}>Cancel</button>
        </div>
      </form>
      {editError && <p className="font-bold p-2 ml-3">Username already exists!</p>}
    </>
  );
}

function EditBio({ setEditBioMode, currBio, setCurrBio }) {
  async function update(formData) {
    const newBio = formData.get("bio");
    const newData = {
      bio: newBio,
    };
    const response = await fetch("http://localhost:4243/profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newData),
    });
    if (response.status === 200) {
      await response.json();
      setCurrBio(newBio);
    } else console.error("Error saving profile changes");
    setEditBioMode(false);
  }
  return (
    <>
      <form className="my-4 w-[50%] flex flex-row" action={update}>
        <TextField
          className="w-full"
          type="text"
          autoComplete="off"
          name="bio"
          label="Bio"
          defaultValue={currBio}
          multiline
        />
        <div className="flex flex-col">
          <input className="cursor-pointer" type="submit" value="Save"></input>
          <button type="button" className="ml-3" onClick={() => { setEditBioMode(false) }}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export { EditName, EditBio };
