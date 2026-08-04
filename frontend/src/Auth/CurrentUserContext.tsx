import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CurrentUser } from "../Types/AdminType";

type CurrentUserContextValue = {
  currentUser: CurrentUser | null;
  loading: boolean;
};

const CurrentUserContext = createContext<CurrentUserContextValue | undefined>(
  undefined,
);

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchCurrentUser() {
      if (localStorage.getItem("isLoggedIn") !== "true") {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      fetch("http://localhost:4243/auth/me", { credentials: "include" })
        .then((res) => (res.status === 200 ? res.json() : null))
        .then((result) => {
          setCurrentUser(
            result?.status === "success"
              ? {
                  id: result.data.user.id,
                  name: result.data.user.name,
                  role: result.data.user.role,
                }
              : null,
          );
        })
        .catch(() => setCurrentUser(null))
        .finally(() => setLoading(false));
    }

    fetchCurrentUser();

    window.addEventListener("auth-changed", fetchCurrentUser);
    return () => window.removeEventListener("auth-changed", fetchCurrentUser);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, loading }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useCurrentUser must be used inside CurrentUserProvider");
  }

  return context;
}
