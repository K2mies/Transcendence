import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import ProtectedRoute from "./Routes/Protection/ProtectedRoute";
import PublicRoute from "./Routes/Protection/PublicRoute";
import WebSocketTest from "./WebSocketTest";

import Header from "./Header/Header";

import Login from "./Registration/Login";
import SignUp from "./Registration/Register";

import Profile from "./Routes/Profile";
import Game from "./Routes/Game";
import Games from "./Routes/Games/Games";

import Home from "./Routes/Home";
import Dashboard from "./Routes/Dashboard";

function Layout() {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" && (
          <Header showSearch={showSearch} setShowSearch={setShowSearch} />
        )}

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="games" element={<Games />} />
          <Route path="user/:username" element={<Profile />} />
          <Route path="game/:name" element={<Game />} />
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
