interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <main className="h-screen">{children}</main>;
};

export default Layout;
