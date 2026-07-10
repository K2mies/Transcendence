import ControlledBioInput from "./ControlledBioInput";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UpdateBioProps = {
  setUpdateBioMode: (updateBioMode: boolean) => void;
  currBio: string;
  setCurrBio: (currBio: string) => void;
};

type FormValues = {
  bio: string;
};

const schema = z.object({
  bio: z.string().max(1000, "Biography must be max 1000 characters"),
});

function UpdateBio({ setUpdateBioMode, currBio, setCurrBio }: UpdateBioProps) {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { bio: "" },
  });
  const [updateError, setUpdateError] = useState<string | undefined>(undefined);

  useEffect(() => {
    reset({ bio: currBio ?? "" });
  }, [currBio, reset]);

  async function update(values: FormValues) {
    const newBio = values.bio;

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

    const data = await response.json();
    if (response.status === 200) {
      setCurrBio(newBio);
      setUpdateBioMode(false);
    } else {
      setUpdateError(data.error || "Error saving biography. Please try again.");
    }
  }
  return (
    <>
      <form
        className="my-4 w-[50%] flex flex-row"
        onSubmit={handleSubmit(update)}
      >
        <ControlledBioInput
          control={control}
          name="bio"
          label="Biography"
          autoComplete="off"
        />
        <div className="flex flex-col">
          <input className="cursor-pointer" type="submit" value="Save"></input>
          <button
            type="button"
            className="ml-3"
            onClick={() => {
              setUpdateBioMode(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
      {updateError && <p className="font-bold p-2 ml-3">{updateError}</p>}
    </>
  );
}

export default UpdateBio;
