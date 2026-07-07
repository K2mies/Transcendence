import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UseChat from "../Chat/UseChat";
import type { RegistrationProps } from "../types";

function Logout({ setMyCurrUser }: RegistrationProps) {
  const [logoutError, setLogoutError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { closeSocket } = UseChat();

  async function logMeOut() {
    try {
      const response: Response = await fetch("http://localhost:4243/auth/logout", {
        method: "POST",
        credentials: "include",
      });
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
    } catch (error: any) {
      setLogoutError(true);
    }
  }
  return (
    <div>
      <button type="button" onClick={logMeOut}>Logout</button>
      {logoutError && (
        <p>Error logging you out. Please try again.</p>
      )}
    </div>
  )
}

export default Logout;
