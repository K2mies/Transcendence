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
import Game from "./Game";

function Header() {
  return (
    <div>
      <nav className="flex flex-row justify-around">
        <Link to="/">GoodPlays</Link>
        {/* <Link to="/explore">Explore</Link>
        <Link to="/mygames">My games</Link> */}
      </nav>
    </div>
  );
}

function Home() {
  return (
    <div className="m-0 flex flex-col">
      <img
        className="w-126.25 h-107.75"
        src="/logo_03.jpg"
        alt="GoodPlays logo"
      />
      <h1 className="font-header text-orange">GoodPlays</h1>
      <h2>Welcome to GoodPlays!</h2>
      <div className="text-green">
        <p>Already have an account?</p>
        <Link to="/login">Log in</Link>
      </div>
      <div className="text-blue">
        <p>New user?</p>
        <Link to="/register">Sign up!</Link>
      </div>
    </div>
  );
}

function SignUp() {
  return (
    <div>
      <h2>Sign up to GoodPlays</h2>
      <RegisterForm></RegisterForm>
      <p>Already have an account?</p>
      <Link to="/login">Log in</Link>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Login to Goodplays</h2>
      <LoginForm></LoginForm>
      <p>New user?</p>
      <Link to="/register">Sign up</Link>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
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
