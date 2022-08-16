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
      <div className="mx-auto mt-20 mb-10 flex h-full w-[90%] flex-col  items-center justify-center rounded-[3rem] bg-white px-8 pt-16 pb-7 md:px-16 md:pt-24  md:pb-16 lg:w-[80%] lg:px-20 2xl:px-0">
        <h1 className="mb-2 text-center text-5xl font-medium text-black md:text-6xl lg:text-7xl xl:text-8xl">
          Kōkai Chatti.
        </h1>
        <div className="mx-auto w-full sm:w-[80%] md:w-full 2xl:w-[60%]">
          <p className="mb-5 text-center text-base font-medium text-black md:text-xl lg:text-xl xl:text-2xl">
            Getting in touch is more essential than ever. Chat with strangers,
            people from all over the world. Choose hide your name and photo and
            chat with anonymity!
          </p>
        </div>

        <button
          disabled={user ? true : false}
          type="button"
          className="mb-12 flex items-center gap-1 text-lg  text-system-blue md:text-xl lg:text-2xl"
          onClick={() => {
            toast.promise(signIn(), {
              loading: "Sign in...",
              success: <b>Signed in successfully!</b>,
              error: <b>Could not sign in.</b>,
            });
          }}
        >
          <span className="hover-effect"> Sign in with Google</span>
          <MdOutlineArrowForwardIos className="text-base lg:text-xl" />
        </button>
        <div>
          <Image
            src="/assets/chatti-sample.png"
            width={1016}
            height={720}
            priority
            alt="Chatti Thumbnail"
            className="rounded-xl"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
