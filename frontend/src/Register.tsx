import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function SignUp({ setCurrUser }) {
  return (
    <div className="bg-secondary flex min-h-screen flex-col items-center justify-center text-center">
      <div className="bg-tertiary p-4 rounded-lg">
        <h2 className="bg-primary text-tertiary p-4 rounded-t-lg">
          Sign up to GoodPlays
        </h2>
        <RegisterForm setCurrUser={setCurrUser}></RegisterForm>
        <p>Already have an account?</p>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default SignUp;
