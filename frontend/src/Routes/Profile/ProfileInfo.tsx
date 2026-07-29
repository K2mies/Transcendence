import { useRef, useState, useEffect } from "react";
import UpdateUsername from "./UpdateUsername";
import UpdateBio from "./UpdateBio";
import FriendButton from "../Friendship/FriendButton";
import FriendList from "../Friendship/FriendList";
import UseChat from "../../Chat/UseChat";
import { FaEdit } from "react-icons/fa";
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
  const editRef = useRef<any>(null);
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
            setMyCurrUser={setMyCurrUser}
            editRef={editRef}
          />
        )}
        {!updateUsernameMode && (
          <h2 className="p-4 font-bold">{profile.name}</h2>
        )}
        {onlineUsers.has(profile.id) && (
          <span aria-label="Online" className="h-2.5 w-2.5 rounded-full bg-online" />
        )}
        {isMyUser && !updateUsernameMode && (
          <button
            className="text-secondary hover:text-tertiary"
            aria-label="Change username"
            onClick={() => {
              setUpdateUsernameMode(true);
          }}>
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
          <div className="whitespace-pre-wrap w-[50%] wrap-anywhere">
            <p className="my-4 mr-4 text-left w-full">
              {currBio}
            </p>
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
