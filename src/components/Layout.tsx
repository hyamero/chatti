import { Toaster } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { Loader } from "./Loader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { loading } = useAuth();

  const display = loading ? <Loader /> : children;

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <main className="h-screen">{display}</main>;
    </>
  );
};

export default Layout;
