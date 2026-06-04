import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Game from "./Game";

function Home() {
  return (
    <div className="m-0 flex flex-col items-center gap-4 text-center">
      <img className="w-96 h-auto" src="/logo_03.jpg" alt="GoodPlays logo" />

      <h1>GoodPlays</h1>
      <h2>Welcome to GoodPlays!</h2>

      <div>
        <p>Already have an account?</p>
        <Link to="/login">Log in</Link>
      </div>

      <div>
        <p>New user?</p>
        <Link to="/register">Sign up!</Link>
      </div>
    </div>
  );
}

function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h2>Sign up to GoodPlays</h2>
      <RegisterForm></RegisterForm>
      <p>Already have an account?</p>
      <Link to="/login">Log in</Link>
    </div>
  );
}

function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h2>Login to Goodplays</h2>
      <LoginForm></LoginForm>
      <p>New user?</p>
      <Link to="/register">Sign up</Link>
    </div>
  );
}

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
