import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen m-0 flex flex-col items-center gap-4 text-center bg-[var(--color-secondary)]">
      <div>
        <div className="border-3 border-[var(--color-primary)] p-4 rounded-t-lg mt-6">
          <img
            className="w-67 h-auto"
            src="/logo_03_with_alpha.png"
            alt="GoodPlays logo"
          />
        </div>

        <h1 className="bg-[var(--color-primary)] text-[var(--color-tertiary)] rounded-b-lg">
          GoodPlays
        </h1>
      </div>
      <div className="mb-4">
        <h2 className=" bg-[var(--color-primary)] text-[var(--color-tertiary)] p-4 rounded-t-lg">
          Welcome to GoodPlays!
        </h2>

        <div className="w-full bg-[var(--color-tertiary)] text-[var(--color-primary)] p-4 rounded-b-lg">
          <div>
            <p>Already have an account?</p>
            <Link to="/login">Log in</Link>
          </div>

          <div>
            <p>New user?</p>
            <Link to="/register">Sign up!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
