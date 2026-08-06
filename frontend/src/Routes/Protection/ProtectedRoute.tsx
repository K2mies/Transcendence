import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useCurrentUser } from "../../Auth/CurrentUserContext";

export default function ProtectedRoute() {
  const { currentUser, loading } = useCurrentUser();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!currentUser) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}