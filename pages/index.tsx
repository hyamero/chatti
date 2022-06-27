import type { NextPage } from "next";
import { SignIn } from "../src/components/SignIn";

const Home: NextPage = () => {
  return (
    <div>
      <div className="App flex h-screen flex-col items-center justify-center font-sfpro">
        <SignIn />
      </div>
    </div>
  );
};

export default Home;
