import { TextField } from "@mui/material";

export default function EditBio() {
  const onSubmit = async (data) => {
    const newData = {
      bio: data,
    };
	console.log(newData);
    const response = await fetch("http://localhost:4243/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newData),
    });
    if (response.status === 200) await response.json();
    else console.error("Error saving profile changes");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
		<TextField type="text" autoComplete="off" label="Edit profile info" />
		<input type="submit"></input>
	  </form>
    </>
  );
}
