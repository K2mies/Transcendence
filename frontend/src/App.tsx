import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import ProtectedRoute from "./Routes/Protection/ProtectedRoute";
import PublicRoute from "./Routes/Protection/PublicRoute";
import AdminRoute from "./Routes/Protection/AdminRoute";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import Login from "./Registration/Login";
import SignUp from "./Registration/Register";

import OAuthCallback from "./Auth/OAuthCallback";
import OAuthUsernamePicker from "./Auth/OAuthUsernamePicker";

import Profile from "./Routes/Profile/Profile";
import Game from "./Routes/Game/Game";
import Games from "./Routes/Games/Games";

import Home from "./Routes/Home";
import Dashboard from "./Routes/Dashboard/Dashboard";

import NotFound from "./NotFound";

import { ChatProvider } from "./Chat/ChatContext";
import Chat from "./Chat/Chat";

import TermsOfService from "./Footer/Routes/TermsOfService";
import PrivacyPolicy from "./Footer/Routes/PrivacyPolicy";
import RatingSystem from "./Footer/Routes/RatingSystem";
import Accessibility from "./Footer/Routes/Accessibility";

import { FavoritesProvider } from "./Rating/FavoritesProvider";
import { CurrentUserProvider, useCurrentUser } from "./Auth/CurrentUserContext";
import Admin from "./Routes/Admin/Admin";

import { Toaster } from "react-hot-toast";

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
  const [isUserFound, setIsUserFound] = useState<boolean | undefined>(
    undefined,
  );
  const [isGameFound, setIsGameFound] = useState<boolean | undefined>(
    undefined,
  );
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (!currentUser) return;

    localStorage.setItem(
      "user",
      JSON.stringify({ id: currentUser.id, name: currentUser.name }),
    );

    if (currentUser.name !== myCurrUser) {
      setMyCurrUser(currentUser.name);
    }
  }, [currentUser, myCurrUser]);
  const [isUserFound, setIsUserFound] = useState<boolean | undefined>(
    undefined,
  );
  const [isGameFound, setIsGameFound] = useState<boolean | undefined>(
    undefined,
  );

  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/oauth/callback" ||
    location.pathname === "/oauth/username-picker";

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--color-primary)",
            color: "var(--color-tertiary)",
            padding: "12px 16px",
          },
        }}
      />

      {!hideHeader && (
        <Header
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          myCurrUser={myCurrUser}
          setMyCurrUser={setMyCurrUser}
          isUserFound={isUserFound}
          isGameFound={isGameFound}
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
                  isUserFound={isUserFound}
                  setIsUserFound={setIsUserFound}
                />
              }
            />
            <Route
              path="game/:name"
              element={
                <Game
                  myCurrUser={myCurrUser}
                  isGameFound={isGameFound}
                  setIsGameFound={setIsGameFound}
                />
              }
            />
            <Route path="chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="admin" element={<Admin />} />
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
      <ChatProvider>
        <FavoritesProvider>
          <CurrentUserProvider>
            <Layout />
          </CurrentUserProvider>
        </FavoritesProvider>
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
