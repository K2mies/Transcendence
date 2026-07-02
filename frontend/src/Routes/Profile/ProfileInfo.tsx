import { useState, useEffect } from "react";
import EditUsername from "./EditUserName";
import EditBio from "./EditProfile";
import FriendButton from "../Friendship/FriendButton";
import FriendList from "../Friendship/FriendList";
import type { Profile } from "../../types";

type ProfileInfoProps = {
  profile: Profile;
  myCurrUser: string;
  setMyCurrUser: (myCurrUser: string | null) => void;
};

function ProfileInfo({ profile, myCurrUser, setMyCurrUser }: ProfileInfoProps) {
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const [editBioMode, setEditBioMode] = useState(false);
  const [currBio, setCurrBio] = useState(profile.bio);
  const isMyUser = myCurrUser === profile.name;

  useEffect(() => {
    setCurrBio(profile.bio);
  }, [profile]);

  return (
    <div className="bg-primary text-tertiary flex flex-col rounded-t-lg">
      <div className="flex h-[4.3em]">
        {editUsernameMode && (
          <EditUsername
            setEditUsernameMode={setEditUsernameMode}
            myCurrUser={myCurrUser}
            setMyCurrUser={setMyCurrUser}
          />
        )}
        {!editUsernameMode && <h2 className="p-4">{profile.name}</h2>}
        {isMyUser && !editUsernameMode && (
          <button onClick={() => setEditUsernameMode(true)}>
            Change username
          </button>
        )}
        <div className="bg-primary text-tertiary ml-auto m-6">
          {!isMyUser && (
            <FriendButton
              user={profile.name}
              myCurrUser={myCurrUser}
            ></FriendButton>
          )}
          {isMyUser && (
            <FriendList
              friends={profile.friends}
              sentReqs={profile.sent_reqs}
              recvReqs={profile.received_reqs}
              myCurrUser={myCurrUser}
            ></FriendList>
          )}
        </div>
      </div>
      <div className="bg-tertiary text-primary border-primary border-3 flex flex-row items-start gap-8 rounded-b-lg">
        <img
          className="border-secondary border-4 w-40 h-auto rounded-lg m-4"
          src="/logo_03.jpg"
          alt="Placeholder for profile picture"
        ></img>
        {editBioMode && (
          <EditBio
            setEditBioMode={setEditBioMode}
            currBio={currBio}
            setCurrBio={setCurrBio}
          />
        )}
        {!editBioMode && (
          <p className=" my-4 mr-4 max-w-[50%] text-left">{currBio}</p>
        )}
        {isMyUser && !editBioMode && (
          <button className="mt-4" onClick={() => setEditBioMode(true)}>
            Edit biography
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
