import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import WebSocketTest from "./WebSocketTest";

import Header from "./Header";

import Login from "./Login";
import SignUp from "./Register";

import Profile from "./Profile";
import Game from "./Game";

import Home from "./Home";
import Dashboard from "./Dashboard";

function Layout() {
  const myUser = localStorage.getItem("user");
  let myUsername: string | null = null;
  if (myUser) {
    try {
      myUsername = (JSON.parse(myUser) as { name?: string }).name ?? null;
    } catch {
      myUsername = null;
    }
  }
  const [myCurrUser, setMyCurrUser] = useState<string | null>(myUsername);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      setMyCurrUser(null);
      navigate("/dashboard");
    }
  }, [localStorage.getItem("isLoggedIn")]);

  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" && (
          <Header myCurrUser={myCurrUser} setMyCurrUser={setMyCurrUser} />
        )}

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route
            path="register"
            element={<SignUp setMyCurrUser={setMyCurrUser} />}
          />
          <Route
            path="login"
            element={<Login setMyCurrUser={setMyCurrUser} />}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="user/:username"
            element={
              <Profile myCurrUser={myCurrUser} setMyCurrUser={setMyCurrUser} />
            }
          />
          <Route path="game/:name" element={<Game myCurrUser={myCurrUser} />} />
          <Route path="ws-test" element={<WebSocketTest />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
