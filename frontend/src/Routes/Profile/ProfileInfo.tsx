import { useState, useEffect } from "react";
import EditUsername from "./EditUsername";
import EditBio from "./EditBio";
import FriendButton from "../Friendship/FriendButton";
import FriendList from "../Friendship/FriendList";
import UseChat from "../../Chat/UseChat";
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
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const [editBioMode, setEditBioMode] = useState(false);
  const [currBio, setCurrBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState(profile.image);
  const isMyUser = myCurrUser === profile.name;
  const { onlineUsers, friends } = UseChat();

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file)
      return;
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch (`http://localhost:4243/profile/upload`,
      {
        method: "POST",
        credentials: "include",
        body: formData
      });
      if (response.ok)
      {
        const data = await response.json();
        setAvatar(data);
      }
  }
  const deleteImage = async (e) => {
    const response = await fetch (`http://localhost:4243/profile/delete`,
      {
        method: "POST",
        credentials: "include",
      });
      if (response.ok)
      {
        setAvatar(null);
      }
  }

  useEffect(() => {
      setCurrBio(profile.bio);
  }, [profile]);



  return (
    <div className="bg-primary text-tertiary flex flex-col rounded-t-lg">
      <div className="flex gap-2 items-center text-tertiary">
        {editUsernameMode && (
          <EditUsername
            setEditUsernameMode={setEditUsernameMode}
            myCurrUser={myCurrUser}
            setMyCurrUser={setMyCurrUser}
          />
        )}
        {!editUsernameMode && (
          <h2 className="p-4 font-bold">{profile.name}</h2>
        )}
        {onlineUsers.has(profile.id) && (
          <span className="h-2.5 w-2.5 rounded-full bg-online" />
        )}
        {isMyUser && !editUsernameMode && (
          <button onClick={() => setEditUsernameMode(true)}>
            Change username
          </button>
        )}
        <div className="bg-primary text-tertiary ml-auto m-6">
          {!isMyUser && (
            <FriendButton
              key={friends.has(profile.id)}
              user={profile.name}
              myCurrUser={myCurrUser}
            ></FriendButton>
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
        {avatar ?
        <img
          src={`data:image/jpeg;base64,${avatar}`}
          alt="Profile picture"
        ></img>
        : <IoPerson size={150} />
        }
      {isMyUser && (
        <div className="absolute bottom-0 right-0 bg-secondary px-2 py-1 rounded-l flex gap-2">
        <label className="cursor-pointer" title="Upload avatar">
          <FaEdit size={15} />
          <input type="file" accept=".jpg" className="hidden" onChange={uploadImage} />
        </label>
        <button className="cursor-pointer" title="Delete avatar" onClick={deleteImage}>
          <ImCross size={10} />
          </button>
    </div>
      )}
    </div>
        {editBioMode && (
          <EditBio
            setEditBioMode={setEditBioMode}
            currBio={currBio}
            setCurrBio={setCurrBio}
          />
        )}
        {!editBioMode && (
          <div className="whitespace-pre-wrap">
            <p className="my-4 mr-4 max-w-[50%] text-left">
              {currBio}
            </p>
          </div>
        )}
        {isMyUser && !editBioMode && (
          <button
            className="mt-4"
            onClick={() => setEditBioMode(true)}
          >
            Edit biography
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;



/*
  return (
    <div className="bg-primary text-tertiary flex flex-col rounded-t-lg">
      <div className="flex gap-2 items-center text-tertiary">
        {editUsernameMode && (
          <EditUsername
            setEditUsernameMode={setEditUsernameMode}
            myCurrUser={myCurrUser}
            setMyCurrUser={setMyCurrUser}
          />
        )}
        {!editUsernameMode && (
          <h2 className="p-4 font-bold">{profile.name}</h2>
        )}
        {onlineUsers.has(profile.id) && (
          <span className="h-2.5 w-2.5 rounded-full bg-online" />
        )}
        {isMyUser && !editUsernameMode && (
          <button onClick={() => setEditUsernameMode(true)}>
            Change username
          </button>
        )}
        <div className="bg-primary text-tertiary ml-auto m-6">
          {!isMyUser && (
            <FriendButton
              key={friends.has(profile.id)}
              user={profile.name}
              myCurrUser={myCurrUser}
            ></FriendButton>
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
        <div className="relative m-4">
        <img
          className="border-secondary border-4 w-40 h-auto rounded-lg m-4"
          src={avatar ? `data:image/jpeg;base64,${profile.image}` : "/logo_03.jpg"}
          alt="Profile picture"
        ></img>
      {isMyUser && (
        <label className="cursor-pointer absolute bottom-0 right-0 bg-secondary text-xs px-2 py-1 rounded">
          Change photo
          <input type="file" accept=".jpg" className="hidden" onChange={uploadImage} />
        </label>
      )}
    </div>
        {editBioMode && (
          <EditBio
            setEditBioMode={setEditBioMode}
            currBio={currBio}
            setCurrBio={setCurrBio}
          />
        )}
        {!editBioMode && (
          <div className="whitespace-pre-wrap">
            <p className="my-4 mr-4 max-w-[50%] text-left">
              {currBio}
            </p>
          </div>
        )}
        {isMyUser && !editBioMode && (
          <button
            className="mt-4"
            onClick={() => setEditBioMode(true)}
          >
            Edit biography
          </button>
        )}
      </div>
    </div>
  );
}*/