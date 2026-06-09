import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import DisplayProfile from "./Profile";
import WebSocketTest from "./WebSocketTest";
import Profile from "./Profile";

import Header from "./Header";

import Login from "./Login";
import SignUp from "./Register";

import Profile from "./Profile";
import Game from "./Game";

import Home from "./Home";
import Dashboard from "./Dashboard";

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
          <Route path="user/:username" element={<Profile />} />
          <Route path="game/:name" element={<Game />} />
          <Route path="ws-test" element={<WebSocketTest/>} />
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
