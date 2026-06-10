import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="bg-secondary flex min-h-screen flex-col items-center justify-center text-center">
      <div className="bg-tertiary rounded-lg p-4">
        <h2 className="bg-primary text-tertiary p-4 rounded-t-lg">
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
