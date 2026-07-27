import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import ProtectedRoute from "./Routes/Protection/ProtectedRoute";
import PublicRoute from "./Routes/Protection/PublicRoute";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import Login from "./Registration/Login";
import SignUp from "./Registration/Register";

import OAuthCallback from "./OAuthCallback";
import OAuthUsernamePicker from "./OAuthUsernamePicker";

import Profile from "./Routes/Profile/Profile";
import Game from "./Routes/Game/Game";
import Games from "./Routes/Games/Games";

import Home from "./Routes/Home";
import Dashboard from "./Routes/Dashboard/Dashboard";

import { ChatProvider } from "./Chat/ChatContext";
import Chat from "./Chat/Chat";

import TermsOfService from "./Footer/Routes/TermsOfService";
import PrivacyPolicy from "./Footer/Routes/PrivacyPolicy";
import RatingSystem from "./Footer/Routes/RatingSystem";
import Accessibility from "./Footer/Routes/Accessibility";

import { FavoritesProvider } from "./Rating/FavoritesContext";

function ScrollToTop() {
  const path = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return null;
}

function Layout() {
  const myUser = localStorage.getItem("user");
  let myUsername: string | undefined = undefined;
  if (myUser) {
    try {
      myUsername = (JSON.parse(myUser) as { name?: string }).name ?? undefined;
    } catch {
      myUsername = undefined;
    }
  }
  const [myCurrUser, setMyCurrUser] = useState<string | undefined>(myUsername);
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/oauth/callback" ||
    location.pathname === "/oauth/username-picker";

  return (
    <>
      {!hideHeader && (
        <Header
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          myCurrUser={myCurrUser}
          setMyCurrUser={setMyCurrUser}
        />
      )}

      <main className="flex-1">
        <Routes>
          <Route path="terms" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="rating" element={<RatingSystem />} />
          <Route path="accessibility" element={<Accessibility />} />

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
            <Route
              path="oauth/callback"
              element={<OAuthCallback setMyCurrUser={setMyCurrUser} />}
            />
            <Route
              path="oauth/username-picker"
              element={<OAuthUsernamePicker setMyCurrUser={setMyCurrUser} />}
            />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="games" element={<Games />} />
            <Route
              path="user/:username"
              element={
                <Profile
                  myCurrUser={myCurrUser}
                  setMyCurrUser={setMyCurrUser}
                />
              }
            />
            <Route
              path="game/:name"
              element={<Game myCurrUser={myCurrUser} />}
            />
            <Route path="chat" element={<Chat />} />
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
      <ScrollToTop />
      <ChatProvider>
        <FavoritesProvider>
          <Layout />
        </FavoritesProvider>
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
