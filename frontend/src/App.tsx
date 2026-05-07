import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import MyForm from "./Form.jsx";

let signed: boolean = false;

function Header() {
  return (
    <div>
      <nav className="header">
        <Link to="/">GoodPlays</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/mygames">My games</Link>
      </nav>
    </div>
  );
}

function Home() {
  if (!signed) {
    return (
      <div>
        <img src="/logo_03.jpg" alt="GoodPlays logo" />
        <h1>GoodPlays</h1>
        <h2>Welcome to GoodPlays!</h2>
        <p>Already have an account?</p>
        <p>New user?</p>
        <Link to="/register">Sign up!</Link>
      </div>
    );
  }
  return <div>Signed in homepage</div>;
}

function SignUp() {
  return (
    <div>
      <h2>Sign up to GoodPlays</h2>
      <MyForm></MyForm>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<SignUp />} />
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
