import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="bg-[var(--color-secondary)] flex min-h-screen flex-col items-center justify-center text-center">
      <div className="bg-[var(--color-tertiary)] rounded-lg p-4">
        <h2 className="bg-[var(--color-primary)] text-[var(--color-tertiary)] p-4 rounded-t-lg">
          Login to Goodplays
        </h2>
        <LoginForm></LoginForm>
        <p>New user?</p>
        <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
