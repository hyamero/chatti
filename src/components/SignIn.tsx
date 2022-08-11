import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = ({}) => {
  const { signIn } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[20vw] font-bold leading-none text-white">Chatti</h1>
      <p className="mb-5 w-[60%] text-center  text-sm text-system-gray-6 lg:w-[70%]  lg:text-xl">
        Public Chat with Anonymous Mode. Wow look at this landing page, the
        author was certainly not being lazy. Here a text there a text lorem
        ipsum here and there
      </p>
      <button
        onClick={() => {
          toast.promise(signIn(), {
            loading: "Sign in...",
            success: <b>Signed in successfully!</b>,
            error: <b>Could not sign in.</b>,
          });
        }}
        type="button"
        className="login-with-google-btn rounded bg-system-blue p-3 text-white"
      >
        Sign in with Google
      </button>
    </div>
  );
};
