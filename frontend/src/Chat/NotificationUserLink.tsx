import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type NotificationUserLinkProps = {
  toastId?: string;
  username: string;
};

function NotificationUserLink({
  toastId,
  username,
}: NotificationUserLinkProps) {
  const navigate = useNavigate();

  function openProfile() {
    if (toastId) {
      toast.dismiss(toastId);
    }

    navigate(`/user/${encodeURIComponent(username)}`);
  }

  return (
    <button
      type="button"
      onClick={openProfile}
      className="font-bold text-secondary"
    >
      {username}
    </button>
  );
}

export default NotificationUserLink;
