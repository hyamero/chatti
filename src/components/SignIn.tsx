import React from "react";
import { useAuth } from "../contexts/AuthContext";

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = ({}) => {
  const { signIn } = useAuth();

  return (
    <button
      onClick={() => {
        signIn();
      }}
      type="button"
      className="login-with-google-btn rounded bg-system-blue p-3 text-white"
    >
      Sign in with Google
    </button>
  );
};
