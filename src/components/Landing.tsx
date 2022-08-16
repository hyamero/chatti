import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Footer } from "./Footer";

export const Landing: React.FC = () => {
  const { signIn, user } = useAuth();

  return (
    <>
      <div className="mx-auto mt-20 mb-10 flex h-full w-[80%] flex-col items-center justify-center rounded-[3rem] bg-white pt-24 pb-16">
        <h1 className="mb-2 text-center text-8xl font-medium text-black">
          Kōkai Chatti.
        </h1>
        <div className="mx-auto w-[60%]">
          <p className="mb-5 text-center text-2xl font-medium text-black">
            Getting in touch is more essential than ever. Chat with strangers,
            people from all over the world. Choose hide your name and photo and
            chat with anonymity!
          </p>
        </div>

        <button
          disabled={user ? true : false}
          type="button"
          className="mb-12 flex items-center gap-1 text-2xl text-system-blue"
          onClick={() => {
            toast.promise(signIn(), {
              loading: "Sign in...",
              success: <b>Signed in successfully!</b>,
              error: <b>Could not sign in.</b>,
            });
          }}
        >
          <span className="hover-effect"> Sign in with Google</span>
          <MdOutlineArrowForwardIos className="text-xl" />
        </button>
        <div>
          <Image
            src="/assets/chatti-sample.png"
            width={1016}
            height={720}
            alt="Chatti Thumbnail"
            className="rounded-xl"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
