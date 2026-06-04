import { Link } from "react-router-dom";

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

export default Home;
