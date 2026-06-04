import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h2>Login to Goodplays</h2>
      <LoginForm></LoginForm>
      <p>New user?</p>
      <Link to="/register">Sign up</Link>
    </div>
  );
}

export default Login;
