import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="bg-secondary min-h-screen m-0 flex flex-col items-center gap-4 text-center">
      <div
        className={`
          flex flex-col gap-6
          transition-opacity duration-2000
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      >
        <div>
          <div className="border-primary border-3 p-4 rounded-t-lg mt-6">
            <img
              className="w-67 h-auto"
              src="/logo_03_with_alpha.png"
              alt="GoodPlays logo"
            />
          </div>

          <h1 className="bg-primary text-tertiary rounded-b-lg">GoodPlays</h1>
        </div>
        <div
          className={`
            mb-4
            transition-translate duration-1000
            ${visible ? "translate-y-0" : "translate-y-8"}
          `}
        >
          <h2 className=" bg-primary text-tertiary p-4 rounded-t-lg">
            Welcome to GoodPlays!
          </h2>

          <div className="bg-tertiary text-primary border-primary border-3 w-full p-4 rounded-b-lg">
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
    </div>
  );
}

export default Home;
