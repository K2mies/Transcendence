import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../Auth/CurrentUserContext";

export default function AdminRoute() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { currentUser, loading } = useCurrentUser();

  if (isLoggedIn !== "true") {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return null;
  }

  if (currentUser?.role !== "ADMIN" && currentUser?.role !== "SUPERUSER") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
