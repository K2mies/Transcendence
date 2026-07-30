import { useRef, useState, useEffect } from "react";
import UpdateUsername from "./UpdateUsername";
import UpdateBio from "./UpdateBio";
import FriendButton from "../Friendship/FriendButton";
import FriendList from "../Friendship/FriendList";
import UseChat from "../../Chat/UseChat";
import { Alert } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import type { UserProfile } from "../../types";

type ProfileInfoProps = {
  profile: UserProfile;
  myCurrUser: string | undefined;
  setMyCurrUser: (myCurrUser: string | undefined) => void;
};

function ProfileInfo({ profile, myCurrUser, setMyCurrUser }: ProfileInfoProps) {
  const [updateUsernameMode, setUpdateUsernameMode] = useState<boolean>(false);
  const [updateBioMode, setUpdateBioMode] = useState<boolean>(false);
  const [currBio, setCurrBio] = useState<string>(profile.bio);
  const [avatar, setAvatar] = useState<string | null>(profile.image ?? null);
  const editRef = useRef<any>(null);
  const isMyUser = myCurrUser === profile.name;
  const { onlineUsers, friends } = UseChat();
  const [editError, setEditError] = useState<string | undefined>(undefined);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    e.target.value = "";
    const response = await fetch(`http://localhost:4243/profile/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      setAvatar(data);
    } else {
      setEditError(data.message || "Error uploading avatar. Please try again.");
      setTimeout(() => {
        setEditError("");
      }, 5000);
    }
  };
  const deleteImage = async (e) => {
    const response = await fetch(`http://localhost:4243/profile/delete`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      setAvatar(null);
    } else {
      setEditError(data.message || "Error deleting avatar. Please try again.");
    }
  };

  useEffect(() => {
    setCurrBio(profile.bio);
    setAvatar(profile.image ?? null);
  }, [profile.bio, profile.image]);

  return (
    <div className="bg-primary text-tertiary flex flex-col rounded-t-lg">
      <div className="flex gap-2 items-center text-tertiary">
        {updateUsernameMode && (
          <UpdateUsername
            setUpdateUsernameMode={setUpdateUsernameMode}
            setMyCurrUser={setMyCurrUser}
            editRef={editRef}
          />
        )}
        {!updateUsernameMode && (
          <h2 className="p-4 font-bold">{profile.name}</h2>
        )}
        {onlineUsers.has(profile.id) && (
          <span
            aria-label="Online"
            className="h-2.5 w-2.5 rounded-full bg-online"
          />
        )}
        {isMyUser && !updateUsernameMode && (
          <button
            className="text-secondary hover:text-tertiary"
            aria-label="Change username"
            onClick={() => {
              setUpdateUsernameMode(true);
            }}
          >
            <FaEdit size={16} aria-hidden="true" focusable="false" />
          </button>
        )}
        <div className="bg-primary text-tertiary ml-auto m-6">
          {!isMyUser && (
            <FriendButton user={profile.name} myCurrUser={myCurrUser} />
          )}
          {isMyUser && (
            <FriendList
              key={friends.size}
              friends={profile.friends}
              sentReqs={profile.sent_reqs}
              recvReqs={profile.received_reqs}
              myCurrUser={myCurrUser}
            ></FriendList>
          )}
        </div>
      </div>
      <div className="bg-tertiary text-primary border-primary border-3 flex flex-row items-start gap-8 rounded-b-lg">
        <div className="relative m-4 border-secondary border-4 w-40 h-auto rounded-lg m-4">
          {avatar ? (
            <img
              src={`data:image/jpeg;base64,${avatar}`}
              alt="Profile picture"
            ></img>
          ) : (
            <IoPerson size={150} />
          )}
          {isMyUser && (
            <div className="absolute bottom-0 right-0 bg-secondary px-2 py-1 rounded-l flex gap-2">
              <label className="cursor-pointer" title="Upload avatar">
                <FaEdit size={15} />
                <input
                  type="file"
                  accept="image/png, image/jpeg, .png, .jpg, .jpeg"
                  className="hidden"
                  onChange={uploadImage}
                />
              </label>
              {avatar && (
                <button
                  className="cursor-pointer"
                  title="Delete avatar"
                  onClick={deleteImage}
                >
                  <ImCross size={10} />
                </button>
              )}
            </div>
          )}
          {editError && (
            <Alert
              severity="error"
              variant="filled"
              className="absolute -bottom-15.5 text-nowrap"
            >
              {editError}
            </Alert>
          )}
        </div>
        {updateBioMode && (
          <UpdateBio
            setUpdateBioMode={setUpdateBioMode}
            currBio={currBio}
            setCurrBio={setCurrBio}
          />
        )}
        {!updateBioMode && currBio && (
          <div className="whitespace-pre-wrap w-[50%] wrap-anywhere">
            <p className="my-4 mr-4 text-left w-full">{currBio}</p>
          </div>
        )}
        {isMyUser && !updateBioMode && (
          <div className="flex flex-1 justify-end mr-6">
            <button
              className="mt-4 text-secondary hover:text-primary"
              onClick={() => setUpdateBioMode(true)}
              aria-label="Open biography editor"
            >
              <FaEdit size={18} aria-hidden="true" focusable="false" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
