import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import type { RegistrationProps } from "../types";

function Login({ setMyCurrUser }: RegistrationProps) {
  return (
    <>
      <title>GoodPlays: Log in</title>
      <div className="bg-secondary flex min-h-screen flex-col items-center justify-center text-center">
        <div className="bg-tertiary rounded-lg p-4">
          <h1 className="bg-primary text-tertiary p-4 rounded-t-lg">
            Log in to Goodplays
          </h1>
          <LoginForm setMyCurrUser={setMyCurrUser}></LoginForm>
          <p>New user?</p>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
