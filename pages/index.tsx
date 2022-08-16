import type { NextPage } from "next";
import { Landing } from "../src/components/Landing";

const Home: NextPage = () => {
  return (
    <div className="font-sfpro">
      <Landing />
    </div>
  );
};

export default Home;
