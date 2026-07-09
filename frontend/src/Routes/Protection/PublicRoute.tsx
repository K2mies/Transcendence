import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
