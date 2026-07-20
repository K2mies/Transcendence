import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import type { RegistrationProps } from "../types";

function SignUp({ setMyCurrUser }: RegistrationProps) {
  return (
    <div className="bg-secondary flex min-h-screen flex-col items-center justify-center text-center p-6">
      <div className="bg-tertiary rounded-lg p-4">
        <h2 className="bg-primary text-tertiary p-4 rounded-t-lg">
          Sign up to GoodPlays
        </h2>
        <RegisterForm setMyCurrUser={setMyCurrUser}></RegisterForm>
        <p>Already have an account?</p>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default SignUp;
