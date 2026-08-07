import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbLogout } from "react-icons/tb";
import UseChat from "../Chat/UseChat";
import type { RegistrationProps } from "../types";

function Logout({ setMyCurrUser }: RegistrationProps) {
  const navigate = useNavigate();
  const { closeSocket } = UseChat();

  async function logMeOut() {
    try {
      const response: Response = await fetch(
        "/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Logout failed");
      }

      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("user");
      setMyCurrUser(undefined);
      closeSocket();

      window.dispatchEvent(new Event("auth-changed"));
      navigate("/");
    } catch (error) {
      toast.custom(() => (
        <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
          <div className="flex items-center gap-2">
            {error instanceof Error && error.message
              ? error.message
              : "Oops! Something went wrong. Please try again."}
          </div>
        </div>
      ));
    }
  }
  return (
    <div>
      <button type="button" onClick={logMeOut} aria-label="Logout">
        <TbLogout
          className="text-tertiary hover:text-secondary mt-1.5 stroke-3"
          size={18}
          aria-hidden="true"
          focusable="false"
        />
      </button>
    </div>
  );
}

export default Logout;
