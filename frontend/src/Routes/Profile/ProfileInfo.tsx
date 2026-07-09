import { useState, useEffect } from "react";
import UpdateUsername from "./UpdateUsername";
import UpdateBio from "./UpdateBio";
import FriendButton from "../Friendship/FriendButton";
import FriendList from "../Friendship/FriendList";
import UseChat from "../../Chat/UseChat";
import { FaEdit } from "react-icons/fa";
import type { UserProfile } from "../../types";
import { FaE } from "react-icons/fa6";

type ProfileInfoProps = {
  profile: UserProfile;
  myCurrUser: string | undefined;
  setMyCurrUser: (myCurrUser: string | undefined) => void;
};

function ProfileInfo({ profile, myCurrUser, setMyCurrUser }: ProfileInfoProps) {
  const [updateUsernameMode, setUpdateUsernameMode] = useState<boolean>(false);
  const [updateBioMode, setUpdateBioMode] = useState<boolean>(false);
  const [currBio, setCurrBio] = useState<string>(profile.bio);
  const isMyUser = myCurrUser === profile.name;
  const { onlineUsers, friends } = UseChat();

  useEffect(() => {
      setCurrBio(profile.bio);
  }, [profile]);

  return (
    <div className="bg-primary text-tertiary flex flex-col rounded-t-lg">
      <div className="flex gap-2 items-center text-tertiary">
        {updateUsernameMode && (
          <UpdateUsername
            setUpdateUsernameMode={setUpdateUsernameMode}
            myCurrUser={myCurrUser}
            setMyCurrUser={setMyCurrUser}
          />
        )}
        {!updateUsernameMode && (
          <h2 className="p-4 font-bold">{profile.name}</h2>
        )}
        {onlineUsers.has(profile.id) && (
          <span className="h-2.5 w-2.5 rounded-full bg-online" />
        )}
        {isMyUser && !updateUsernameMode && (
          <button onClick={() => setUpdateUsernameMode(true)}>
            <FaEdit size={16} aria-hidden="true" focusable="false" />
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
        <img
          className="border-secondary border-4 w-40 h-auto rounded-lg m-4"
          src="/logo_03.jpg"
          alt="Placeholder for profile picture"
        ></img>
        {isMyUser && updateBioMode && (
          <UpdateBio
            setUpdateBioMode={setUpdateBioMode}
            currBio={currBio}
            setCurrBio={setCurrBio}
          />
        )}
        {!updateBioMode && currBio && (
          <div className="whitespace-pre-wrap w-[50%]">
            <p className="my-4 text-left">
              {currBio}
            </p>
          </div>
        )}
        {isMyUser && !updateBioMode && (
          <button
            className="mt-4"
            onClick={() => setUpdateBioMode(true)}
            aria-label="Open biography editor"
          >
            <FaEdit size={18} aria-hidden="true" focusable="false" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
