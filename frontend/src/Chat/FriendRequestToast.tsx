import toast from "react-hot-toast";
import { FaUserFriends } from "react-icons/fa";
import { FRIEND_ICON_SIZE } from "./NotificationConstants";
import NotificationUserLink from "./NotificationUserLink";

type FriendRequestToastProps = {
  toastId: string;
  senderName: string;
};

function FriendRequestToast({ toastId, senderName }: FriendRequestToastProps) {

  async function acceptRequest() {
    try {
      toast.dismiss(toastId);
      const response = await fetch(
        `http://localhost:4243/profile/${encodeURIComponent(senderName)}/accept-request`,
        {
          method: "PUT",
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to accept friend request");
      }

      toast.custom((t) => (
        <div className="rounded-lg bg-primary p-4 text-tertiary">
          <div className="flex items-center gap-2">
            <FaUserFriends size={FRIEND_ICON_SIZE} className="text-tertiary" />

            <div>
              You are now friends with{" "}
              <NotificationUserLink toastId={t.id} username={senderName} />!
            </div>
          </div>
        </div>
      ));
    } catch {
      toast.error("Failed to accept friend request.");
    }
  }

  async function declineRequest() {
    try {
      toast.dismiss(toastId);
      const response = await fetch(
        `http://localhost:4243/profile/${senderName}/decline-request`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to decline friend request");
      }

      toast("Friend request declined.", {
        icon: (
          <FaUserFriends size={FRIEND_ICON_SIZE} className="text-tertiary" />
        ),
      });
    } catch {
      toast.error("Failed to decline friend request.");
    }
  }

  return (
    <div className="rounded-lg bg-primary p-4 text-tertiary">
      <div className="mb-3 flex items-center gap-2">
        <FaUserFriends size={FRIEND_ICON_SIZE} className="text-tertiary" />

        <div>
          <NotificationUserLink toastId={toastId} username={senderName} /> sent
          you a friend request.
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="rounded bg-primary px-3 py-1 hover:bg-secondary text-tertiary"
          onClick={acceptRequest}
        >
          <span>Accept</span>
        </button>

        <button
          className="rounded bg-primary px-3 py-1 hover:bg-secondary text-tertiary"
          onClick={declineRequest}
        >
          <span>Decline</span>
        </button>
      </div>
    </div>
  );
}

export default FriendRequestToast;
