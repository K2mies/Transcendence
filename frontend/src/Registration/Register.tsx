import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import type { RegistrationProps } from "../types";

function SignUp({ setMyCurrUser }: RegistrationProps) {
  return (
    <>
      <title>GoodPlays: Sign up</title>
      <div className="bg-secondary flex min-h-screen flex-col items-center justify-center text-center">
        <div className="bg-tertiary p-4 rounded-lg">
          <h1 className="bg-primary text-tertiary p-4 rounded-t-lg">
            Sign up to GoodPlays
          </h1>
          <RegisterForm setMyCurrUser={setMyCurrUser}></RegisterForm>
          <p>Already have an account?</p>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;
