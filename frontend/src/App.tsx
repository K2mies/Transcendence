import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

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
  const [currUser, setCurrUser] = useState<string>(myUsername);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" && <Header currUser={currUser} />}

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route
            path="register"
            element={<SignUp setCurrUser={setCurrUser} />}
          />
          <Route path="login" element={<Login setCurrUser={setCurrUser} />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="user/:username"
            element={<Profile currUser={currUser} setCurrUser={setCurrUser} />}
          />
          <Route path="game/:name" element={<Game currUser={currUser} />} />
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
