import { TextField } from "@mui/material";

type EditBioProps = {
  setEditBioMode: (editBioMode: boolean) => void;
  currBio: string;
  setCurrBio: (currBio: string) => void;
};

function EditBio({ setEditBioMode, currBio, setCurrBio }: EditBioProps) {
  async function update(formData: FormData) {
    const newBio: string | undefined = formData.get("bio")?.toString();
    if (newBio) {
      const newData: { bio: string } = {
        bio: newBio,
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
        setCurrBio(newBio);
      } else {
        setEditBioMode(false);
      }
    } else {
      setEditBioMode(false);
    }
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
          <button
            type="button"
            className="ml-3"
            onClick={() => {
              setEditBioMode(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default EditBio;
