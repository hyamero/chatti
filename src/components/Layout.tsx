import { useAuth } from "../contexts/AuthContext";
import { Loader } from "./Loader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { loading } = useAuth();

  const display = loading ? <Loader /> : children;

  return <main className="h-screen">{display}</main>;
};

export default Layout;
