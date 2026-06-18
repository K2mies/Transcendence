import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditName({ setEditNameMode, setCurrUser }) {
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
      <form action={update}>
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
        />
        <input type="submit"></input>
      </form>
      {editError && <p className="ml-3">Username already exists!</p>}
    </>
  );
}

function EditBio({ setEditBioMode }) {
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
    if (response.status === 200) await response.json();
    else console.error("Error saving profile changes");
    setEditBioMode(false);
  }
  return (
    <>
      <form action={update}>
        <TextField type="text" autoComplete="off" name="bio" label="Bio" />
        <input type="submit"></input>
      </form>
    </>
  );
}

export { EditName, EditBio };
