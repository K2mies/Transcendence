import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProtectedRoute from "./Routes/Protection/ProtectedRoute";
import PublicRoute from "./Routes/Protection/PublicRoute";
import WebSocketTest from "./WebSocketTest";

import Header from "./Header/Header";

import Login from "./Registration/Login";
import SignUp from "./Registration/Register";

import Profile from "./Routes/Profile/Profile";
import Game from "./Routes/Game";
import Games from "./Routes/Games/Games";

import Home from "./Routes/Home";
import Dashboard from "./Routes/Dashboard";

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
  const [showSearch, setShowSearch] = useState(false);

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
          <Header
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            myCurrUser={myCurrUser}
          />
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
          <Route path="games" element={<Games />} />
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
