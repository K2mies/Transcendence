import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import isSigned from "./IsSigned"

function Header() {
  return (
    <div>
      <nav className="header">
        <Link to="/">GoodPlays</Link>
        {/* <Link to="/explore">Explore</Link>
        <Link to="/mygames">My games</Link> */}
      </nav>
    </div>
  );
}

function Home() {
  if (!isSigned.value) {
    return (
      <div style={{ marginTop: "0px" }}>
        <img src="/logo_03.jpg" alt="GoodPlays logo" />

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
  return <div>Signed in homepage</div>;
}

function SignUp() {
  return (
    <div>
      <h2>Sign up to GoodPlays</h2>
      <RegisterForm></RegisterForm>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Login to Goodplays</h2>
      <LoginForm></LoginForm>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/register"
      && location.pathname !== "/login" && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<Login />} />
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
