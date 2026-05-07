import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
}

function SignUp() {
  return (
    <div>
      <h2>Sign up to GoodPlays</h2>
      <MyForm>FORM</MyForm>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/explore" element={<Explore />} />
			<Route path="/mygames" element={<MyGames />} /> */}
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
