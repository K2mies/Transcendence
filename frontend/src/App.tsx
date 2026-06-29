import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import ProtectedRoute from "./Routes/Protection/ProtectedRoute";
import PublicRoute from "./Routes/Protection/PublicRoute";
import WebSocketTest from "./WebSocketTest";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import Login from "./Registration/Login";
import SignUp from "./Registration/Register";

import OAuthCallback from "./OAuthCallback";
import OAuthUsernamePicker from "./OAuthUsernamePicker";

import Profile from "./Routes/Profile";
import Game from "./Routes/Game";
import Games from "./Routes/Games/Games";

import Home from "./Routes/Home";
import Dashboard from "./Routes/Dashboard";

import TermsOfService from "./Routes/TermsOfService";

function Layout() {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
        {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" &&
        location.pathname !== "/oauth/callback" &&
        location.pathname !== "/oauth/username-picker" && (
          <Header showSearch={showSearch} setShowSearch={setShowSearch} />
        )}
      <main className="flex-1">
        <Routes>
          <Route path="terms" element={<TermsOfService />} />

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="oauth/callback" element={<OAuthCallback />} />
          <Route path="oauth/username-picker" element={<OAuthUsernamePicker />} />
        </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="games" element={<Games />} />
            <Route path="user/:username" element={<Profile />} />
            <Route path="game/:name" element={<Game />} />
            <Route path="ws-test" element={<WebSocketTest />} />
          </Route>
        </Routes>
      </main>
      <Footer />
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
