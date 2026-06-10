import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Header from "./Header";

import Login from "./Login";
import SignUp from "./Register";

import Profile from "./Profile";
import Game from "./Game";
import Games from "./Games";

import Home from "./Home";
import Dashboard from "./Dashboard";

import { ChatProvider } from "./chat/ChatContext";
import Chat from "./chat/Chat";

function Layout() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" && <Header />}

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
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <Layout />
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
