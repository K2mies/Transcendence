import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h2>Sign up to GoodPlays</h2>
      <RegisterForm></RegisterForm>
      <p>Already have an account?</p>
      <Link to="/login">Log in</Link>
    </div>
  );
}

export default SignUp;
